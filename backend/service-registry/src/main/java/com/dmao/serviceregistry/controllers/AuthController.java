package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * The controller that handles all mappings for the auth-service.
 *
 * @author Aron Hemmes
 */
@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    private final RestTemplate restTemplate;

    @Autowired
    public AuthController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}