package com.dma.menuservice.models;

import java.util.ArrayList;

/**
 * The restaurant model.
 *
 * @author Jelle Huibregtse
 */
public class Restaurant {
    private long id;

    private String name;

    private String colorScheme;

    private String logoURL;

    private ArrayList<Integer> menuIDs;

    public Restaurant() {

    }

    public Restaurant(String name, String colorScheme, String logoURL, ArrayList<Integer> menuIDs) {
        this.name = name;
        this.colorScheme = colorScheme;
        this.logoURL = logoURL;
        this.menuIDs = menuIDs;
    }

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
}