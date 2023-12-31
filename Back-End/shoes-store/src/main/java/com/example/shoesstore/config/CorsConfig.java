package com.example.shoesstore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The CorsConfig class is a @Configuration for CORS configuration
 * Implements WebMvcConfigurer to customize configuration
 * @author: ThanhPV
 * @date: 12/12/2023
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * The addCorsMappings method configures CORS for the "/api/**" mappings.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param registry CorsRegistry object for CORS configuration.
     */
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH")
                .allowedHeaders("*");
    }
}
