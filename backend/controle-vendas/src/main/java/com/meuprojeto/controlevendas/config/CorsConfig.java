package com.meuprojeto.controlevendas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configuração global
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "https://controle-vendas-frontend.onrender.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");

                // Configuração específica para health check (opcional)
                registry.addMapping("/health")
                        .allowedOrigins("*")
                        .allowedMethods("GET");
            }
        };
    }
}