package com.dma.menuservice.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * The MenuItem entity.
 *
 * @author Jelle Huibregtse
 */
@Entity
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    public MenuItem() {

    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
