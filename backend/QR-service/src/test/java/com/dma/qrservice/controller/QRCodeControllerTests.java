package com.dma.qrservice.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for the QR code controller
 *
 * @author Jelle Huibregtse
 */
@SpringBootTest
@AutoConfigureMockMvc
class QRCodeControllerTests {

    private static final String BASE_URL = "/qr-codes";

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void postForQRCode_withValidRequest_StatusOK() throws Exception {
        var text = "https://www.example.com/";

        this.mockMvc.perform(post(BASE_URL).contentType(MediaType.APPLICATION_JSON)
                .content(text))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.IMAGE_PNG_VALUE));
    }

    @Test
    public void postForQRCode_withEmptyRequest_StatusBadRequest() throws Exception {
        this.mockMvc.perform(post(BASE_URL)).andExpect(status().isBadRequest());
    }

    @Test
    public void postForQRCode_withLargeRequestBody_Status() throws Exception {
        Random random = ThreadLocalRandom.current();
        byte[] bytes = new byte[4096];
        random.nextBytes(bytes);
        String text = new String(bytes);

        this.mockMvc.perform(post(BASE_URL).contentType(MediaType.APPLICATION_JSON)
                .content(text))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
