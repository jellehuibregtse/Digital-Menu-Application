package com.dma.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

/**
 * Routing configuration for gateway.
 *
 * @author Aron Hemmes
 */
@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator dmaRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/api/restaurants/**")
                        .uri("lb://restaurant-service"))
                .route(p -> p
                        .path("/api/menus/**")
                        .uri("lb://menu-service"))
                .route(p -> p
                        .path("/api/orders/**", "/api/websockets/**")
                        .uri("lb://order-service"))
                .route(p -> p
                        .path("/api/qr-codes/**")
                        .uri("lb://qr-service"))
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}