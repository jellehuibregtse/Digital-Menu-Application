package com.dma.restaurantservice.models;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Collection;

/**
 * The restaurant entity.
 *
 * @author Jordan Radushev
 * @author Aron Hemmes
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @Setter(AccessLevel.PROTECTED)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotNull
    @Column(unique = true)
    private String name;
    @NotNull
    private String displayName;
    @NotNull
    private long userId;
    @NotNull
    @Min(1)
    private int tableCount;
    @OneToOne(cascade = CascadeType.ALL)
    private Styling styling;
}