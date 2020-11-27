package com.dma.restaurantservice.models;

import lombok.*;

import javax.persistence.*;

/**
 * The restaurant styling entity.
 *
 * @author Aron Hemmes
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Styling {

    @Id
    @Setter(AccessLevel.PROTECTED)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String colorScheme;
    private String logoURL;
}