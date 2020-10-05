package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping("/qr-codes")
public class QRController {

    private final RestTemplate restTemplate;

    @Autowired
    public QRController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}