package com.dma.orderservice.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * The order entity (named customer order due to conflict with framework).
 *
 * @author Jelle Huibregtse
 */
@Entity
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private Status status;

    @NotNull
    private long restaurantId;

    @NotNull
    private int tableNumber;

    @OneToMany(cascade = CascadeType.ALL)
    private List<MenuItem> menuItems;

    @NotNull
    private String createdDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_TIME);

    public CustomerOrder() {

    }

    public CustomerOrder(@NotNull Status status, @NotNull long restaurantId, @NotNull int tableNumber, List<MenuItem> menuItems) {
        this.status = status;
        this.restaurantId = restaurantId;
        this.tableNumber = tableNumber;
        this.menuItems = menuItems;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> itemIDs) {
        this.menuItems = itemIDs;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
