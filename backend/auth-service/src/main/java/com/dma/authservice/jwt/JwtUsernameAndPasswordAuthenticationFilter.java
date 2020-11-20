package com.dma.authservice.jwt;

import com.dma.authservice.services.JwtTokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HttpMethod;
import java.io.IOException;
import java.util.Collections;
import java.util.stream.Collectors;

/**
 * This filter authenticates a user with username and password then returns a JWT token.
 *
 * @author Jelle Huibregtse
 */
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtConfig jwtConfig;
    // We use auth manager to validate the user credentials.
    private final AuthenticationManager authManager;
    private final JwtTokenService jwtTokenService;

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authManager,
                                                      JwtConfig jwtConfig,
                                                      JwtTokenService jwtTokenService) {
        this.authManager = authManager;
        this.jwtConfig = jwtConfig;
        this.jwtTokenService = jwtTokenService;

        // By default, UsernamePasswordAuthenticationFilter listens to "/login" path.
        // In our case, we use "/auth". So, we need to override the defaults.
        this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getUri(), HttpMethod.POST));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) {
        try {
            // Get credentials from request.
            var userCredentials = new ObjectMapper().readValue(request.getInputStream(), AuthenticationRequest.class);

            // Create auth object, that contains the credentials, which will be used by auth manager
            var authToken = new UsernamePasswordAuthenticationToken(userCredentials.getUsername(),
                                                                    userCredentials.getPassword(),
                                                                    Collections.emptyList());

            // Authentication manager authenticates the user, and uses the UserDetailsServiceImpl::loadUserByUsername() method to load the user.
            return authManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // Upon successful authentication, generate a token.
    // The 'auth' passed to successfulAuthentication() is the current authenticated user.
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authentication) {

        // Converts the authorities to list of strings.
        // This is important because it affects the way we get them back at the gateway.
        var token = jwtTokenService.generateToken(authentication.getName(),
                                                  authentication.getAuthorities()
                                                                .stream()
                                                                .map(GrantedAuthority::getAuthority)
                                                                .collect(Collectors.toList()));

        // Add token to header.
        response.addHeader(jwtConfig.getHeader(), jwtConfig.getPrefix() + token);
    }

    @Getter
    @Setter
    private static class AuthenticationRequest {

        private String username;
        private String password;
    }
}