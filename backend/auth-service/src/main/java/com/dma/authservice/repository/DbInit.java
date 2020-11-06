package com.dma.authservice.repository;

import com.dma.authservice.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

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

        final List<ApplicationUser> users =
                Arrays.asList(new ApplicationUser(1, "jelle", passwordEncoder.encode("12345"), "USER"),
                              new ApplicationUser(2, "admin", passwordEncoder.encode("12345"), "ADMIN"));

        this.repository.saveAll(users);
    }
}