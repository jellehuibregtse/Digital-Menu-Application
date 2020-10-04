package com.dma.orderservice.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class CustomerOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private OrderStatus status;

    @NotNull
    private long restaurantId;

    @NotNull
    private int tableNumber;

    @ElementCollection
    private List<Integer> itemIDs;

    @NotNull
    @CreatedDate
    private LocalDateTime createdDateTime;

    public CustomerOrder() {

    }

    public CustomerOrder(List<Integer> itemIDs) {
        this.itemIDs = itemIDs;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Integer> getItemIDs() {
        return itemIDs;
    }

    public void setItemIDs(List<Integer> itemIDs) {
        this.itemIDs = itemIDs;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
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

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
