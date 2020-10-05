package com.dmao.serviceregistry.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.awt.image.BufferedImage;

/**
 * The websocket configuration class.
 *
 * @author Aron Hemmes
 */
@RestController
@CrossOrigin
@RequestMapping("/qr-codes")
public class QRController {

    private final String URL = "http://qr-service/api/qr-codes";
    private final RestTemplate restTemplate;

    @Autowired
    public QRController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostMapping(value = "/", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> generateQRCode(@RequestBody String text) {
        try {
            return restTemplate.exchange(URL + "/", HttpMethod.POST, new HttpEntity<>(text), BufferedImage.class);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}