package com.dma.qrservice.controller;

import com.dma.qrservice.model.QRCodeGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The controller that handles all mappings for the qr-service.
 *
 * @author Jelle Huibregtse
 */
@RestController
@RequestMapping(value = "/qr-codes")
public class QRCodeController {

    /**
     * A POST mapping for the generation of a QR code.
     *
     * @param text the text to be stored in the QR code
     * @return an <code>BufferedImage</code> with a HTTP status of 200.
     */
    @PostMapping(produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<?> generateQRCode(@RequestBody String text) {
        try {
            return ResponseEntity.ok(QRCodeGenerator.generateQRCodeImage(text));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>("Data too big.", HttpStatus.BAD_REQUEST);
    }
}