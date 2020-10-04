package com.dma.qrservice.controllers;

import com.dma.qrservice.models.QRCodeGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;

/**
 * The controller that handles all mappings for the qr-service.
 *
 * @author Jelle Huibregtse
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/qr-codes")
public class QRCodeController {

    /**
     * A POST mapping for the generation of a QR code.
     *
     * @param text the text to be stored in the QR code
     * @return an <code>BufferedImage</code> with a HTTP status of 200.
     * @throws Exception when creation fails.
     */
    @PostMapping(value = "/", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<BufferedImage> generateQRCode(@RequestBody String text) throws Exception {
        return new ResponseEntity<>(QRCodeGenerator.generateQRCodeImage(text), HttpStatus.OK);
    }
}