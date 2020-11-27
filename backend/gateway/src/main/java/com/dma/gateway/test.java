package com.dma.gateway;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {

    @GetMapping("/token")
    public ResponseEntity<String> token(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(token);
    }
}
