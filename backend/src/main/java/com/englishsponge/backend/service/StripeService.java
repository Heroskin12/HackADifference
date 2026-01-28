package com.englishsponge.backend.service;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.exception.InternalAppException;
import com.englishsponge.backend.remote.DbExecutor;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.Invoice;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class StripeService {

    private final DbExecutor executor;

    public StripeService(@Value("${stripe.secret}") String stripeSecret, DbExecutor executor) {
        this.executor = executor;
        Stripe.apiKey = stripeSecret;
    }

    public Session createCheckoutSession(UserDto user, Integer priceId, String cbu) {
        String stripePriceId = executor.runSingle(
                "SELECT stripe_identifier FROM subscription_tiers WHERE id = :id",
                String.class,
                Map.of("id", priceId)
        );

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                                                                       .setMode(
                                                                               SessionCreateParams.Mode.SUBSCRIPTION)
                                                                       .setSuccessUrl(
                                                                               cbu + "#paysuccess")
                                                                       .setCancelUrl(
                                                                               cbu + "#payfail")
                                                                       .addLineItem(
                                                                               SessionCreateParams.LineItem.builder()
                                                                                                           .setQuantity(
                                                                                                                   1L)
                                                                                                           .setPrice(
                                                                                                                   stripePriceId)  // Your monthly premium price ID from Stripe
                                                                                                           .build()
                                                                       )
                                                                       .putMetadata(
                                                                               "email",
                                                                               user.getEmail());
        if (user.getStripeCusId() != null) {
            paramsBuilder.setCustomer(user.getStripeCusId());
        } else {
            paramsBuilder.setCustomerEmail(user.getEmail());
        }
        try {
            SessionCreateParams params = paramsBuilder.build();
            return Session.create(params);
        } catch (StripeException e) {
            throw new InternalAppException(e);
        }
    }

    public com.stripe.model.billingportal.Session createPortalSession(UserDto user) {
        com.stripe.param.billingportal.SessionCreateParams params = com.stripe.param.billingportal.SessionCreateParams.builder()
                                                                                                                      .setCustomer(
                                                                                                                              user.getStripeCusId())
                                                                                                                      .setReturnUrl(
                                                                                                                              "https://englishsponge.com/settings")
                                                                                                                      .build();
        try {
            return com.stripe.model.billingportal.Session.create(params);
        } catch (StripeException e) {
            throw new InternalAppException(e);
        }
    }

    @Transactional
    public void handleWebhook(Event event) {
        try {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            if (dataObjectDeserializer.getObject().isPresent()) {
                StripeObject stripeObject = dataObjectDeserializer.getObject().get();
                switch (event.getType()) {

                    // ------------------------------------------------------------
                    // 1️⃣ checkout.session.completed → INITIAL SUBSCRIPTION
                    // ------------------------------------------------------------
                    case "checkout.session.completed": {
                        Session session = (Session) stripeObject;
                        String email = session.getCustomerEmail();
                        String customerId = session.getCustomer();
                        String subscriptionId = session.getSubscription();
                        String priceId = Subscription.retrieve(subscriptionId)
                                                     .getItems()
                                                     .getData()
                                                     .getFirst()
                                                     .getPlan()
                                                     .getId();

                        HashMap<String, Object> params = new HashMap<>();
                        params.put("email", email);
                        params.put("customerId", customerId);
                        params.put("subscriptionId", subscriptionId);
                        params.put("priceId", priceId);
                        executor.execute(
                                """
                                        UPDATE users
                                        SET
                                            subscription_tier = (SELECT id FROM subscription_tiers WHERE stripe_identifier = :priceId),
                                            stripe_cus_id = :customerId,
                                            stripe_sub_id = :subscriptionId,
                                            payment_info = null
                                        WHERE email = :email
                                        """,
                                params);

                        break;
                    }

                    // ------------------------------------------------------------
                    // 2️⃣ invoice.paid → RECURRING PAYMENT SUCCESS
                    // ------------------------------------------------------------
                    case "invoice.paid": {
                        Invoice invoice = (Invoice) stripeObject;
                        String status = invoice.getStatus();
                        String customerId = invoice.getCustomer();
                        String subscriptionId = invoice.getLines()
                                                       .getData()
                                                       .getFirst()
                                                       .getParent()
                                                       .getSubscriptionItemDetails()
                                                       .getSubscription();
                        String priceId = Subscription.retrieve(subscriptionId)
                                                     .getItems()
                                                     .getData()
                                                     .getFirst()
                                                     .getPlan()
                                                     .getId();

                        if (status.equals("paid")) {
                            HashMap<String, Object> params = new HashMap<>();
                            params.put("customerId", customerId);
                            params.put("subscriptionId", subscriptionId);
                            params.put("priceId", priceId);
                            executor.execute(
                                    """
                                            UPDATE users
                                            SET
                                                subscription_tier = (SELECT id FROM subscription_tiers WHERE stripe_identifier = :priceId),
                                                stripe_sub_id = :subscriptionId,
                                                payment_info = null
                                            WHERE stripe_cus_id = :customerId
                                            """,
                                    params);
                        }
                        break;
                    }

                    // ------------------------------------------------------------
                    // 3️⃣ invoice.payment_failed → RECURRING PAYMENT FAILED
                    // ------------------------------------------------------------
                    case "invoice.payment_failed": {
                        Invoice invoice = (Invoice) stripeObject;
                        String status = invoice.getStatus();
                        String customerId = invoice.getCustomer();
                        String subscriptionId = invoice.getLines()
                                                       .getData()
                                                       .getFirst()
                                                       .getParent()
                                                       .getSubscriptionItemDetails()
                                                       .getSubscription();
                        String priceId = Subscription.retrieve(subscriptionId)
                                                     .getItems()
                                                     .getData()
                                                     .getFirst()
                                                     .getPlan()
                                                     .getId();

                        break;
                    }

                    // ------------------------------------------------------------
                    // 4️⃣ customer.subscription.updated → STATUS CHANGED
                    // ------------------------------------------------------------
                    case "customer.subscription.updated": {
                        Subscription subscription = (Subscription) stripeObject;
                        String status = subscription.getStatus(); // active, past_due, unpaid, canceled
                        String customerId = subscription.getCustomer();
                        String subscriptionId = subscription.getId();

                        if (status.equals("incomplete") || status.equals("incomplete_expired") || status.equals(
                                "canceled") || status.equals(
                                "unpaid") || status.equals("paused")) {
                            HashMap<String, Object> params = new HashMap<>();
                            params.put("customerId", customerId);
                            params.put("subscriptionId", subscriptionId);
                            executor.execute(
                                    """
                                            UPDATE users
                                            SET
                                                subscription_tier = (SELECT id FROM subscription_tiers WHERE price = 0),
                                                stripe_sub_id = :subscriptionId
                                            WHERE stripe_cus_id = :customerId
                                            """,
                                    params);
                        }

                        if (status.equals("past_due")) {
                            String message = "There was an issue with your payment method! Please check your subscription to not lose the premium benefits";
                            HashMap<String, Object> params = new HashMap<>();
                            params.put("message", message);
                            executor.execute(
                                    """
                                            UPDATE users
                                            SET
                                                payment_info = :message
                                            WHERE stripe_cus_id = :customerId
                                            """,
                                    params);
                        }

                        break;
                    }

                    // ------------------------------------------------------------
                    // 5️⃣ customer.subscription.deleted → USER CANCELLED
                    // ------------------------------------------------------------
                    case "customer.subscription.deleted": {
                        Subscription subscription = (Subscription) stripeObject;
                        String status = subscription.getStatus(); // active, past_due, unpaid, canceled
                        String customerId = subscription.getCustomer();
                        String subscriptionId = subscription.getId();

                        if (status.equals("incomplete") || status.equals("incomplete_expired") || status.equals(
                                "canceled") || status.equals(
                                "unpaid") || status.equals("paused")) {
                            HashMap<String, Object> params = new HashMap<>();
                            params.put("customerId", customerId);
                            params.put("subscriptionId", subscriptionId);
                            executor.execute(
                                    """
                                            UPDATE users
                                            SET
                                                subscription_tier = (SELECT id FROM subscription_tiers WHERE price = 0),
                                                stripe_sub_id = :subscriptionId
                                            WHERE stripe_cus_id = :customerId
                                            """,
                                    params);
                        }

                        break;
                    }

                    // ------------------------------------------------------------
                    default:
                        break;
                }
            } else {
                throw new RuntimeException("Stripe event data object is missing for event " + event);
            }
        } catch (Exception e) {
            log.error("Error while handling webhook", e);
        }
    }
}
