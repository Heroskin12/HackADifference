package com.englishsponge.backend.utility;

import com.englishsponge.backend.exception.InternalAppException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
@Component
public class PasswordUtil {

    public String getMd5(String input)
    {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            StringBuilder hashtext = new StringBuilder(no.toString(16));
            while (hashtext.length() < 32) {
                hashtext.insert(0, "0");
            }
            return hashtext.toString();
        }
        catch (NoSuchAlgorithmException e) {
            log.error("Unable to get MD5 hash", e);
            throw new InternalAppException(e);
        }
    }

}
