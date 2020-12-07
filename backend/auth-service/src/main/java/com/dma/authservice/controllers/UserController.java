package com.dma.authservice.controllers;

import com.dma.authservice.model.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * The controller that handles all the mappings for the user service.
 *
 * @author Jelle Huibregtse
 * @author Aron Hemmes
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final ApplicationUserRepository applicationUserRepository;

    @GetMapping("/logged-in")
    public ResponseEntity<Boolean> loggedIn() {
        return ResponseEntity.ok(true);
    }

    @Autowired
    public UserController(PasswordEncoder passwordEncoder, ApplicationUserRepository applicationUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserRepository = applicationUserRepository;
    }

    /**
     * Check if email is taken.
     *
     * @param email that needs to be found.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<Boolean> emailTaken(@RequestParam String email) {
        return ResponseEntity.ok(isEmailTaken(email));
    }

    /**
     * Create a user.
     *
     * @param user that needs to created
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<String> createApplicationUser(@RequestBody ApplicationUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (isEmailTaken(user.getEmail())) {
            return ResponseEntity.ok(String.format("Email %s is already taken.", user.getEmail()));
        }

        applicationUserRepository.save(user);

        return ResponseEntity.ok(String.format("User with email: %s has been successfully created!", user.getEmail()));
    }

    /**
     * Update a single user.
     *
     * @param user that needs to be updated
     * @return message and HTTP status OK.
     */
    @PutMapping
    public ResponseEntity<String> updateApplicationUser(@RequestBody ApplicationUser user) {
        var principal = getPrincipal();
        var updatedApplicationUser = applicationUserRepository.findByEmail(principal)
                                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                                      "Not found."));

        if (isEmailTaken(user.getEmail())) {
            return ResponseEntity.badRequest().body(String.format("Email %s is already taken.", user.getEmail()));
        }

        updatedApplicationUser.setPassword(passwordEncoder.encode(user.getPassword()));
        updatedApplicationUser.setEmail(user.getEmail());

        applicationUserRepository.save(updatedApplicationUser);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully updated!",
                                               updatedApplicationUser.getId()));
    }

    /**
     * Delete a single user.
     *
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping
    public ResponseEntity<String> deleteApplicationUser() {
        var principal = getPrincipal();

        var user = applicationUserRepository.findByEmail(principal)
                                            .orElseThrow(() -> new ResourceNotFoundException("Not found."));

        applicationUserRepository.delete(user);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully deleted!", user.getId()));
    }

    /**
     * Gets the principal (email) of the currently logged in user.
     *
     * @return email.
     */
    private String getPrincipal() {
        return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private boolean isEmailTaken(String email) {
        return applicationUserRepository.findByEmail(email).isPresent();
    }
}