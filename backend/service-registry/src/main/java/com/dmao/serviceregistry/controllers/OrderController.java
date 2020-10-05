package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class OrderController {

    private final RestTemplate restTemplate;

    @Autowired
    public OrderController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}