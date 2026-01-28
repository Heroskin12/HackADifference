package com.englishsponge.backend.utility;

import com.englishsponge.backend.exception.InternalAppException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.sendgrid.helpers.mail.objects.Personalization;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class MailUtil {

    public int makeOtp() {
        return (int) (Math.random() * 900000) + 100000;
    }

    public void sendOtp(String email, int otp, String task) {
        Email from = new Email("team@englishsponge.com", "Team EnglishSponge");
        Email to = new Email(email);
        Mail mail = new Mail();
        mail.setFrom(from);
        mail.setTemplateId("d-c379cf906d12495887e0f91fc94e331b");

        // Set personalization with dynamic template data
        Personalization personalization = new Personalization();
        personalization.addTo(to);
        personalization.addDynamicTemplateData("otp", otp);
        personalization.addDynamicTemplateData("task", task); // if your template uses {{task}}, optional
        mail.addPersonalization(personalization);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        try {
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException e) {
            log.error("Error while sending email to verify signup", e);
            throw new InternalAppException(e);
        }
    }

}
