package com.dma.qrservice.model;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

public class QRCodeGeneratorTests {

    @Test
    public void generateQRCode_withValidText_returnsBufferedImage() throws Exception {
        var text = "https://www.example.com/";
        var image = QRCodeGenerator.generateQRCodeImage(text);

        Assert.assertNotNull(image);
    }

    @Test
    public void generateQRCode_withoutText_returnsBufferedImage() throws Exception {
        var image = QRCodeGenerator.generateQRCodeImage("");

        Assert.assertNull(image);
    }

}
