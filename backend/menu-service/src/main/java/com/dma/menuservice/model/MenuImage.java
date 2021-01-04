package com.dma.menuservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * The entity class for images.
 *
 * @author Jelle Huibregtse
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String type;

    @Lob
    private byte[] imageBytes;

    public MenuImage(@NotNull String name, @NotNull String type, byte[] image) {
        this.name = name;
        this.type = type;
        this.imageBytes = image;
    }
}
