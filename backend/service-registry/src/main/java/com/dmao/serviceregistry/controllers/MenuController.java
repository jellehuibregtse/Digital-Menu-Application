package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping("/menus")
public class MenuController {

    private final RestTemplate restTemplate;

    @Autowired
    public MenuController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}