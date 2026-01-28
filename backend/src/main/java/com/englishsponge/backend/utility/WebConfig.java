package com.englishsponge.backend.utility;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig  implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://127.0.0.1:5173",
                        "https://englishsponge.onrender.com",
                        "https://englishsponge.com",
                        "https://englishsponge-xudv.onrender.com"
                )
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .exposedHeaders("Set-Cookie");
    }

}
