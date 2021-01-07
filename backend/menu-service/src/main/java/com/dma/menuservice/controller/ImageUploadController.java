package com.dma.menuservice.controller;

import com.dma.menuservice.model.MenuImage;
import com.dma.menuservice.repository.MenuImageRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * The controller that handles image uploads.
 *
 * @author Jelle Huibregtse
 */
@Log4j2
@RestController
@RequestMapping("/menus/images")
public class ImageUploadController {

    private final MenuImageRepository imageRepository;

    public ImageUploadController(MenuImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @PostMapping("/upload")
    public BodyBuilder uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
        log.info(String.format("Original Image Byte Size - %s", file.getBytes().length));

        MenuImage img =
                new MenuImage(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));

        imageRepository.save(img);
        return ResponseEntity.ok();
    }

    @GetMapping("{imageName}")
    public ResponseEntity<MenuImage> getImage(@PathVariable("imageName") String imageName) {
        final Optional<MenuImage> retrievedImage = imageRepository.findByName(imageName);

        return retrievedImage.map(menuImage -> ResponseEntity.ok(new MenuImage(menuImage.getName(),
                                                                               menuImage.getType(),
                                                                               decompressBytes(menuImage.getImageBytes()))))
                             .orElseGet(() -> ResponseEntity.notFound().build());

    }

    /**
     * Compress the image bytes before storing it in the database.
     *
     * @param data from the image.
     * @return compressed bytes.
     */
    private static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.info(String.format("Compressed Image Byte Size - %s", outputStream.toByteArray().length));
        return outputStream.toByteArray();
    }

    /**
     * Uncompress the image bytes before returning to the user.
     *
     * @param data from the image.
     * @return uncompressed version of the image.
     */
    private static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException e) {
            e.printStackTrace();
        }
        return outputStream.toByteArray();
    }
}