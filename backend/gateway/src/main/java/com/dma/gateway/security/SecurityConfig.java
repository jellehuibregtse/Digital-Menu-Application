package com.dma.gateway.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

/**
 * The security configuration for the authentication service.
 *
 * @author Jelle Huibregtse
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConfig jwtConfig;

    public SecurityConfig(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
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
            .antMatchers("/actuator/health/**", "/actuator/routes/**")
            .permitAll()
            // Any other request must be authenticated.
            .anyRequest()
            .authenticated();
    }
}