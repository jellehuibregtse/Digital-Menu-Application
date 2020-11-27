package com.dma.gateway.security;

import com.google.common.base.Strings;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * The filter that will check each request for the JWT token. Then it checks if the token is valid.
 *
 * @author Jelle Huibregtse
 */
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    private final JwtConfig jwtConfig;

    public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    @SuppressWarnings("NullableProblems")
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // 1. Get the authentication header. Tokens are supposed to be passed here.
        var authenticationHeader = request.getHeader(jwtConfig.getHeader());

        // 2. Check if the authentication header is valid.
        if (Strings.isNullOrEmpty(authenticationHeader) || !authenticationHeader.startsWith(jwtConfig.getPrefix())) {
            // If the token is invalid (or non-existent), continue down the filter chain.
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Get the actual token from the header (removing the prefix).
        var token = authenticationHeader.replace(jwtConfig.getPrefix(), "");

        try {
            // 4. Validate the token
            var claims = Jwts.parser().setSigningKey(jwtConfig.getSecret().getBytes()).parseClaimsJws(token).getBody();
            var username = claims.getSubject();
            assert claims.get("id") != null;

            if (!Strings.isNullOrEmpty(username)) {
                // 5. Create the authentication object.
                // UsernamePasswordAuthenticationToken is a built-in object,
                // used by spring to represent the current authenticated / being authenticated user.
                // It needs a list of authorities, which has type of GrantedAuthority interface,
                // where SimpleGrantedAuthority is an implementation of that interface.
                var authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());

                // 6. Authenticate the user; the user is now authenticated within the system.
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // In case of failure. Make sure it's clear; so guarantee user won't be authenticated
            SecurityContextHolder.clearContext();
            // Then throw an exception.
            throw new IllegalStateException(String.format("Token %s is invalid!", token));
        }

        // Make sure that other filters down the chain get called with the proper request and response objects.
        filterChain.doFilter(request, response);
    }
}