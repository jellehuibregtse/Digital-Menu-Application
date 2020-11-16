package com.dma.authservice.controllers;

import com.dma.authservice.model.ApplicationUser;
import com.dma.authservice.model.UserDto;
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

    @Autowired
    public UserController(PasswordEncoder passwordEncoder, ApplicationUserRepository applicationUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.applicationUserRepository = applicationUserRepository;
    }

    /**
     * Get more information by providing the e-mail of the user.
     *
     * @return information on the user.
     */
    @GetMapping("/information")
    public ResponseEntity<Object> retrieveInformation() {
        var principal = getPrincipal();

        var user = applicationUserRepository.findByEmail(principal);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var dto = new UserDto();
        dto.setId(user.get().getId());
        dto.setRestaurantAuthorities(user.get().getRestaurantAuthorities());

        return ResponseEntity.ok(dto);
    }

    /**
     * Check if email is taken.
     *
     * @param email that needs to be found.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<Boolean> emailTaken(@RequestParam String email) {
        return ResponseEntity.ok(applicationUserRepository.findByEmail(email).isPresent());
    }

    /**
     * Create a user.
     *
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<String> createApplicationUser(@RequestBody UserDto userDto) {
        var applicationUser = new ApplicationUser();
        applicationUser.setPassword(passwordEncoder.encode(userDto.getPassword()));

        applicationUserRepository.save(applicationUser);

        return ResponseEntity.ok(String.format("User with email: %s has been successfully created!",
                                               applicationUser.getEmail()));
    }

    /**
     * Update a single user.
     *
     * @param dto that needs to be updated
     * @return message and HTTP status OK.
     */
    @PutMapping
    public ResponseEntity<String> updateApplicationUser(@RequestBody UserDto dto) {
        var principal = getPrincipal();
        var updatedApplicationUser = applicationUserRepository.findByEmail(principal)
                                                              .orElseThrow(() -> new ResourceNotFoundException(
                                                                      "Not found."));

        updatedApplicationUser.setPassword(dto.getPassword());
        updatedApplicationUser.setEmail(dto.getEmail());
        updatedApplicationUser.setRestaurantAuthorities(dto.getRestaurantAuthorities());
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
}
