package com.dma.menuservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.ArrayList;

/**
 * The restaurant model.
 *
 * @author Jelle Huibregtse
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    private long id;

    private String name;

    private String colorScheme;

    private String logoURL;

    private ArrayList<Integer> menuIDs;
}