package com.dma.authservice.security;

import com.dma.authservice.jwt.JwtConfig;
import com.dma.authservice.jwt.JwtTokenAuthenticationFilter;
import com.dma.authservice.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.dma.authservice.repository.ApplicationUserRepository;
import com.dma.authservice.services.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

/**
 * The security configuration for the authentication service.
 *
 * @author Jelle Huibregtse
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityCredentialsConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final JwtConfig jwtConfig;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public SecurityCredentialsConfig(@Qualifier("applicationUserService") UserDetailsService userDetailsService,
                                     JwtConfig jwtConfig,
                                     PasswordEncoder passwordEncoder,
                                     JwtTokenService jwtTokenService,
                                     ApplicationUserRepository applicationUserRepository) {
        this.userDetailsService = userDetailsService;
        this.jwtConfig = jwtConfig;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
        this.applicationUserRepository = applicationUserRepository;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                // Make sure we use a stateless session (a session that won't be used to store a user's state).
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // Handle an authorized attempts.
                .exceptionHandling()
                .authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                // Add a filter to validate user credentials and add token in the response header.
                // What's the authenticationManager()?
                // An object provided by WebSecurityConfigurerAdapter, used to authenticate the user passing user's credentials.
                // The filter needs this auth manager to authenticate the user.
                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig, jwtTokenService, applicationUserRepository))
                .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                // Allow all POST requests, otherwise a user can't authenticate.
                .antMatchers(HttpMethod.POST, jwtConfig.getUri())
                .permitAll()
                // Allow POST request for creating a new user
                .antMatchers(HttpMethod.POST, "/users/**")
                .permitAll()
                // Allow GET for checking if a user with email has been taken
                .antMatchers(HttpMethod.GET, "/users/**")
                .permitAll()
                // Any other requests must be authenticated.
                .anyRequest()
                .authenticated();
    }

    // Spring has UserDetailsService interface, which can be overridden to provide our implementation for fetching user from database (or any other source).
    // The UserDetailsService object is used by the auth manager to load the user from database.
    // In addition, we need to define the password encoder also. So, auth manager can compare and verify passwords.
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
}