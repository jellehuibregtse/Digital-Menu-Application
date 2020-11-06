package com.dma.authservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * The password configuration class. You can use the password encoder bean to encoder passwords.
 *
 * @author Jelle Huibregtse
 */
@Configuration
public class PasswordConfig {

    /**
     * You can autowire this bean to use throughout the service.
     * <p>
     * The encoder strength is translated to iterations. For strength x there will be 2^x iterations.
     * The strength can be between 4 and 31, since 32 will cause an overflow error.
     * Note that a strength of 31 or close thereof will be extremely slow and not usable.
     *
     * @return <code>PasswordEncoder</code> object (which is an interface) that can encode any string.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
