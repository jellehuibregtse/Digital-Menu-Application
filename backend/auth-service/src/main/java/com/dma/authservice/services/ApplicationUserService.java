package com.dma.authservice.services;

import com.dma.authservice.model.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * The service that handles all user actions.
 *
 * @author Jelle Huibregtse
 */
@Service
public class ApplicationUserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final ApplicationUserRepository repository;

    @Autowired
    public ApplicationUserService(PasswordEncoder passwordEncoder, ApplicationUserRepository repository) {
        this.passwordEncoder = passwordEncoder;
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        var user = repository.findByEmail(email);

        if (user.isPresent()) {
            var applicationUser = user.get();

            return new User(applicationUser.getEmail(), applicationUser.getPassword(), new ArrayList<>());
        }

        throw new UsernameNotFoundException("Email: " + email + " not found!");
    }
}