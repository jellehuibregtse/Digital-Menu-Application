package com.dma.authservice.controllers;

import com.dma.authservice.model.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    public UserController(PasswordEncoder passwordEncoder, ApplicationUserRepository applicationUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserRepository = applicationUserRepository;
    }

    /**
     * Create a user.
     *
     * @param user that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping("/register")
    public ResponseEntity<String> createApplicationUser(@RequestBody ApplicationUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        applicationUserRepository.save(user);

        return ResponseEntity.ok(String.format("User with username: %s has been successfully created!",
                                               user.getEmail()));
    }


    /**
     * Update a single user.
     *
     * @param applicationUser that needs to be updated
     * @return message and HTTP status OK.
     */
    @PutMapping("{id}")
    public ResponseEntity<String> updateApplicationUser(@RequestBody ApplicationUser applicationUser,
                                                        @PathVariable long id) {
        var updatedApplicationUser = applicationUserRepository.findById(id)
                                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                                      "Not found."));

        updatedApplicationUser.setPassword(applicationUser.getPassword());
        updatedApplicationUser.setEmail(applicationUser.getEmail());
        updatedApplicationUser.setRestaurantAuthorities(applicationUser.getRestaurantAuthorities());
        applicationUserRepository.save(updatedApplicationUser);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully updated!", id));
    }

    /**
     * Delete a single user.
     *
     * @param id of the applicationUser.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteApplicationUser(@PathVariable long id) {
        ApplicationUser applicationUser = applicationUserRepository.findById(id)
                                                                   .orElseThrow(() -> new ResourceNotFoundException(
                                                                           "Not found."));

        applicationUserRepository.delete(applicationUser);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully deleted!", id));
    }
}
