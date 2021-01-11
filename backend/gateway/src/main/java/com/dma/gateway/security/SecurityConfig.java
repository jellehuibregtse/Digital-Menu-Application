package com.dma.gateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;

/**
 * The security configuration for the authentication service.
 *
 * @author Jelle Huibregtse
 * @author Aron Hemmes
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfig jwtConfig;

    public SecurityConfig(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
            .and()
            .csrf()
            .disable()
            // We want to use a stateless session, since we won't be storing the user's state.
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            // Handle an authorized attempts.
            .exceptionHandling()
            .authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
            // Add a filter to validate the tokens with every request.
            .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
            // Authorization requests config.
            .authorizeRequests()
            // Allow all who are accessing authentication service.
            .antMatchers(HttpMethod.POST, jwtConfig.getUri())
            .permitAll()
            // Allow actuator
            .antMatchers("/actuator/health/**", "/actuator/routes/**")
            .permitAll()
            // Allow certain methods for customer.
            .antMatchers(HttpMethod.GET,
                         "/token",
                         "/api/restaurant-service/restaurants/**",
                         "/api/menu-service/menus/**",
                         "/api/auth-service/users/**")
            .permitAll()
            .antMatchers(HttpMethod.POST, "/api/order-service/orders/**", "/api/auth-service/users/**")
            .permitAll()
            .antMatchers("/api/order-service/websockets/**")
            .permitAll()
            // Any other request must be authenticated.
            .anyRequest()
            .authenticated();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addExposedHeader("Authorization");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}