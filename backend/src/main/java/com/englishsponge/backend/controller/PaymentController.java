package com.englishsponge.backend.controller;

import com.englishsponge.backend.dto.model.UserDto;
import com.englishsponge.backend.dto.response.CreateCheckoutResponse;
import com.englishsponge.backend.dto.response.ManageSubscriptionResponse;
import com.englishsponge.backend.service.AuthService;
import com.englishsponge.backend.service.StripeService;
import com.englishsponge.backend.service.SubscriptionTierService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final AuthService authService;
    private final SubscriptionTierService subscriptionTierService;
    private final StripeService stripeService;
    @Value("${stripe.webhook-secret}")
    private String endpointSecret;

    @GetMapping("/tiers")
    public ResponseEntity<?> getTiers() {
        return ResponseEntity.ok(subscriptionTierService.getTiers());
    }

    @GetMapping("/ccs")
    public ResponseEntity<?> createCheckoutSession(@RequestParam Integer priceId, @RequestParam String cbu, HttpServletRequest request) {
        UserDto user = authService.verify(request);
        return ResponseEntity.ok(new CreateCheckoutResponse(stripeService.createCheckoutSession(user, priceId, cbu)
                                                                         .getUrl()));
    }

    @GetMapping("/manage")
    public ResponseEntity<?> manageSubscription(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        return ResponseEntity.ok(new ManageSubscriptionResponse(stripeService.createPortalSession(user).getUrl()));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getPaymentInfo(HttpServletRequest request) {
        UserDto user = authService.verify(request);
        String message = user.getPaymentInfo();
        return ResponseEntity.ok(message);
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;
        try {
            event = Webhook.constructEvent(
                    payload,
                    sigHeader,
                    endpointSecret
            );
        } catch (SignatureVerificationException e) {
            log.warn(e.getMessage());
            return ResponseEntity.ok("OK");
        }

        stripeService.handleWebhook(event);
        return ResponseEntity.ok("OK");
    }

}
