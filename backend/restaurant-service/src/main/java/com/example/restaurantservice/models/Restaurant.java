package com.example.restaurantservice.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "colorScheme")
    private String colorScheme;

    @Column(name="logo")
    private String logoURL;

    @Column(name="menuIDs")
    private ArrayList<Integer> menuIDs;

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

    public ArrayList<Integer> getMenuIDs() {
        return menuIDs;
    }

    public void setMenuIDs(ArrayList<Integer> menuIDs) {
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
