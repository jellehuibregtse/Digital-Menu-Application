package com.dma.authservice.controllers;

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
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private final PasswordEncoder passwordEncoder;
//    private final ApplicationUserRepository applicationUserRepository;
//
//    @Autowired
//    public UserController(PasswordEncoder passwordEncoder, ApplicationUserRepository applicationUserRepository) {
//        this.passwordEncoder = passwordEncoder;
//        this.applicationUserRepository = applicationUserRepository;
//    }
//
//    /**
//     * Get a single user by username.
//     *
//     * @param user with password and username that needs to be found.
//     * @return <code>ResponseEntity</code> with a user and HTTP status OK.
//     */
//    @PostMapping("/login")
//    public ResponseEntity<ApplicationUser> getApplicationUser(@RequestBody ApplicationUser user) throws Exception {
//        ApplicationUser result = applicationUserRepository.findByUsername(user.getUsername()).orElseThrow(() -> new ResourceNotFoundException("Not found."));
//        if(passwordEncoder.matches(user.getPassword(), result.getPassword()))
//            return ResponseEntity.ok(result);
//        else
//            throw new Exception("Password is incorrect.");
//    }
//
//    /**
//     * Create a user.
//     *
//     * @param user that needs to be created.
//     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
//     */
//    @PostMapping("/register")
//    public ResponseEntity<String> createApplicationUser(@RequestBody ApplicationUser user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        applicationUserRepository.save(user);
//
//        return ResponseEntity.ok(String.format("User with username: %s has been successfully created!", user.getUsername()));
//    }
//
//
//    /**
//     * Update a single user.
//     *
//     * @param applicationUser that needs to be updated
//     * @return message and HTTP status OK.
//     */
//    @PutMapping("/")
//    public ResponseEntity<String> updateApplicationUser(@RequestBody ApplicationUser applicationUser) {
//        ApplicationUser updatedApplicationUser = applicationUserRepository.findById(applicationUser.getId()).orElseThrow(() -> new ResourceNotFoundException("Not found."));
//
//        updatedApplicationUser.setPassword(applicationUser.getPassword());
//        updatedApplicationUser.setUsername(applicationUser.getUsername());
//        updatedApplicationUser.setGrantedAuthorities(applicationUser.getGrantedAuthorities());
//        updatedApplicationUser.setAccountNonExpired(applicationUser.isAccountNonExpired());
//        updatedApplicationUser.setAccountNonLocked(applicationUser.isAccountNonLocked());
//        updatedApplicationUser.setCredentialsNonExpired(applicationUser.isCredentialsNonExpired());
//        updatedApplicationUser.setEnabled(applicationUser.isEnabled());
//        applicationUserRepository.save(updatedApplicationUser);
//
//        return ResponseEntity.ok(String.format("User with id: %d has been successfully updated!", applicationUser.getId()));
//    }
//
//    /**
//     * Delete a single user.
//     *
//     * @param id of the applicationUser.
//     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
//     */
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteApplicationUser(@PathVariable long id) {
//        ApplicationUser applicationUser = applicationUserRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
//
//        applicationUserRepository.delete(applicationUser);
//
//        return ResponseEntity.ok(String.format("User with id: %d has been successfully deleted!", id));
//    }
//}
