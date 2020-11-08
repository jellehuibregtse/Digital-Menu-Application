package com.dma.authservice.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This controller is used only for testing purposes.
 * Especially to check if the JWT authentication is ok.
 *
 * @author Jelle Huibregtse
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Success!");
    }
}