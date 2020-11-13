package com.dma.authservice.repository;

import com.dma.authservice.model.ApplicationUser;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * Initialises the database with some data upon startup.
 *
 * @author Jelle Huibregtse
 */
@Service
public class DbInit implements CommandLineRunner {

    private final ApplicationUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DbInit(ApplicationUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.repository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        this.repository.deleteAll();

        final var users = Arrays.asList(new ApplicationUser(1,
                                                            "user@mail.com",
                                                            passwordEncoder.encode("password"),
                                                            Maps.newHashMap()),
                                        new ApplicationUser(2,
                                                            "admin@mail.com",
                                                            passwordEncoder.encode("password"),
                                                            Maps.newHashMap()));

        this.repository.saveAll(users);
    }
}