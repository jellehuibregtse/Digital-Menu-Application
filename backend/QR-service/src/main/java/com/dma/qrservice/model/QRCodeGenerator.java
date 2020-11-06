package com.dma.qrservice.model;

import com.google.common.base.Strings;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import net.glxn.qrgen.javase.QRCode;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

/**
 * QRCodeGenerator is a class which holds the methods to generate QR codes.
 *
 * @author Jelle Huibregtse
 */
public class QRCodeGenerator {

    /**
     * Generates a QR code based on a string of text using a library.
     *
     * @param text the text to be stored in the QR code
     * @return <code>BufferedImage</code> of the QR code.
     * @throws Exception when creation fails.
     */
    public static BufferedImage generateQRCodeImage(String text) throws Exception {
        if (Strings.isNullOrEmpty(text))
            return null;

        ByteArrayOutputStream byteArrayOutputStream = QRCode.from(text).withErrorCorrection(ErrorCorrectionLevel.Q)
                .withSize(250, 250)
                .stream();
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

        return ImageIO.read(byteArrayInputStream);
    }
}
