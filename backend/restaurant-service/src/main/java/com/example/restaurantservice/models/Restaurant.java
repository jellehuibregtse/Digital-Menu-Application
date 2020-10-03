package com.example.restaurantservice.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Column(unique = true)
    private String name;

    private String colorScheme;

    private String logoURL;

    @ElementCollection
    private List<Integer> menuIDs;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColorScheme() {
        return colorScheme;
    }

    public void setColorScheme(String colorScheme) {
        this.colorScheme = colorScheme;
    }

    public String getLogoURL() {
        return logoURL;
    }

    public void setLogoURL(String logoURL) {
        this.logoURL = logoURL;
    }

    public List<Integer> getMenuIDs() {
        return menuIDs;
    }

    public void setMenuIDs(List<Integer> menuIDs) {
        this.menuIDs = menuIDs;
    }

    public  Restaurant(){

    }
    public Restaurant(String name, String colorScheme, String logoURL, ArrayList<Integer> menuIDs) {
        this.name = name;
        this.colorScheme = colorScheme;
        this.logoURL = logoURL;
        this.menuIDs = menuIDs;
    }
}
