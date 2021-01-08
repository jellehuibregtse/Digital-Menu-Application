package com.dma.menuservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

/**
 * The MenuItem entity.
 *
 * @author Jelle Huibregtse
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    private double price;

    @ManyToOne(cascade = CascadeType.ALL)
    private Category category;

    @OneToOne(cascade = CascadeType.ALL)
    private MenuImage photo;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
}
