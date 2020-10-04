package com.dma.qrservice;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for the QR code controller
 *
 * @author Jelle Huibregtse
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class QRCodeControllerTests {

    private static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), StandardCharsets.UTF_8);
    private static final String BASE_URL = "/qr-codes";

    @Autowired
    private MockMvc mockMvc;

    /**
     * Tests if the POST mapping for QR code generation returns HTTP status OK.
     *
     * @throws Exception when creation fails.
     */
    @Test
    public void postForQRCode_StatusOK() throws Exception {
        var text = "https://www.example.com/";
        var url = BASE_URL + "/";

        this.mockMvc.perform(post(url).contentType(APPLICATION_JSON_UTF8)
                .content(text))
                .andExpect(status().isOk());
    }
}
