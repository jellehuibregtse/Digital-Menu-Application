package com.dma.orderservice.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
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
    private OrderStatus status;

    @NotNull
    private long restaurantId;

    @NotNull
    private int tableNumber;

    @ElementCollection
    private List<Integer> itemIDs;

    @NotNull
    private String createdDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_DATE_TIME);

    public CustomerOrder() {

    }

    public CustomerOrder(@NotNull OrderStatus status, @NotNull long restaurantId, @NotNull int tableNumber, List<Integer> itemIDs) {
        this.status = status;
        this.restaurantId = restaurantId;
        this.tableNumber = tableNumber;
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

    public String getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(String createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
