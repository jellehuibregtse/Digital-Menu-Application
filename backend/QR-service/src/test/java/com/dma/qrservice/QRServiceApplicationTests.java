package com.dma.qrservice;

import com.dma.qrservice.controller.QRCodeController;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class QRServiceApplicationTests {

    @Autowired
    private QRCodeController qrCodeController;

    @Test
    public void contextLoads() {
        Assert.assertNotNull(qrCodeController);
    }
}