package com.dma.authservice.jwt;

import com.google.common.base.Strings;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * The filter that will check each request for the JWT token. Then it checks if the token is valid.
 *
 * @author Jelle Huibregtse
 */
public class JwtTokenVerifier extends OncePerRequestFilter {

    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;

    public JwtTokenVerifier(SecretKey secretKey, JwtConfig jwtConfig) {
        this.secretKey = secretKey;
        this.jwtConfig = jwtConfig;
    }

    @SuppressWarnings("NullableProblems")
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Get the authorization header from the request (which contains the JWT token.
        String authorizationHeader = request.getHeader(jwtConfig.getAuthorizationHeader());

        // If the JWT token is empty or does not have the proper prefix, return.
        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtConfig.getTokenPrefix())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Remove the prefix to get the actual token.
        String token = authorizationHeader.replace(jwtConfig.getTokenPrefix(), "");

        try {
            // Parse the token and get the contents.
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            Claims body = claimsJws.getBody();
            String username = body.getSubject();
            // Get the authorities token and force cast them to a List of Map of String to String.
            @SuppressWarnings("unchecked") var authorities = (List<Map<String, String>>) body.get("authorities");
            // Then we convert the values from that List of Map to a Set of SimpleGrantedAuthority.
            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                                                                              .map(m -> new SimpleGrantedAuthority(m.get(
                                                                                      "authority")))
                                                                              .collect(Collectors.toSet());
            // Finally we set the authentication.
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(username, null, simpleGrantedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtException e) {
            // If the token is deemed invalid we throw an exception.
            throw new IllegalStateException(String.format("Token %s is invalid!", token));
        }

        // Make sure that other filters down the chain get called with the proper request and response objects.
        filterChain.doFilter(request, response);
    }
}