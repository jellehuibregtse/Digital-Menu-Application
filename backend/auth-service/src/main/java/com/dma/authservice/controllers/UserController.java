package com.dma.authservice.controllers;

import com.dma.authservice.auth.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public UserController(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    /**
     * Get a list of all users.
     *
     * @return <code>ResponseEntity</code> with a list of users and HTTP status OK.
     */
    @GetMapping
    public ResponseEntity<List<ApplicationUser>> getAllApplicationUsers() {
        List<ApplicationUser> result = new ArrayList<>();
        applicationUserRepository.findAll().forEach(result::add);

        return ResponseEntity.ok(result);
    }

    /**
     * Get a single user by username.
     *
     * @param id of the applicationUser.
     * @return <code>ResponseEntity</code> with a user and HTTP status OK.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationUser> getApplicationUser(@PathVariable long id) {
        ApplicationUser result =
                applicationUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
        return ResponseEntity.ok(result);
    }

    /**
     * Create a user.
     *
     * @param applicationUser that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<String> createApplicationUser(@RequestBody ApplicationUser applicationUser) {
        applicationUserRepository.save(applicationUser);

        return ResponseEntity.ok(String.format("User with username: %s has been successfully created!",
                                               applicationUser.getUsername()));
    }


    /**
     * Update a single user.
     *
     * @param applicationUser that needs to be updated
     * @return message and HTTP status OK.
     */
    @PutMapping
    public ResponseEntity<String> updateApplicationUser(@RequestBody ApplicationUser applicationUser) {
        ApplicationUser updatedApplicationUser = applicationUserRepository.findById(applicationUser.getId())
                                                                          .orElseThrow(() -> new ResourceNotFoundException(
                                                                                  "Not found."));
        updatedApplicationUser.setPassword(applicationUser.getPassword());
        updatedApplicationUser.setUsername(applicationUser.getUsername());
        updatedApplicationUser.setGrantedAuthorities(applicationUser.getGrantedAuthorities());
        updatedApplicationUser.setAccountNonExpired(applicationUser.isAccountNonExpired());
        updatedApplicationUser.setAccountNonLocked(applicationUser.isAccountNonLocked());
        updatedApplicationUser.setCredentialsNonExpired(applicationUser.isCredentialsNonExpired());
        updatedApplicationUser.setEnabled(applicationUser.isEnabled());
        applicationUserRepository.save(updatedApplicationUser);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully updated!",
                                               applicationUser.getId()));
    }

    /**
     * Delete a single user.
     *
     * @param id of the applicationUser.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteApplicationUser(@PathVariable long id) {
        ApplicationUser applicationUser =
                applicationUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));

        applicationUserRepository.delete(applicationUser);

        return ResponseEntity.ok(String.format("User with id: %d has been successfully deleted!", id));
    }

}
