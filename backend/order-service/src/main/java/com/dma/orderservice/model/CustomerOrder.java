package com.dma.orderservice.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

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
    private Status status = Status.NEW;

    @NotNull
    private long restaurantId;

    @NotNull
    private int tableNumber;

    @NotNull
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @NotNull
    private String createdDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS).format(DateTimeFormatter.ISO_TIME);

    public CustomerOrder() {}

    public CustomerOrder(@NotNull Status status,
                         @NotNull long restaurantId,
                         @NotNull int tableNumber,
                         @NotNull List<OrderItem> items) {
        this.status = status;
        this.restaurantId = restaurantId;
        this.tableNumber = tableNumber;
        this.items = items;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }

        var order = (CustomerOrder) obj;
        return Objects.equals(this.status, order.status)
               && Objects.equals(this.restaurantId, order.restaurantId)
               && Objects.equals(this.tableNumber, order.tableNumber)
               && Objects.equals(this.items, order.items);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
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
