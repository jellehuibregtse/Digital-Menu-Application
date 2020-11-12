package com.dma.orderservice.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * The OrderItem entity.
 *
 * @author Jelle Huibregtse
 * @author Aron Hemmes
 */
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    @NotNull
    @Min(1)
    private int quantity = 1;

    @NotNull
    private Status status = Status.NEW;

    public OrderItem() {}

    public OrderItem(@NotNull String name, @NotNull @Min(1) int quantity, @NotNull Status status) {
        this.name = name;
        this.quantity = quantity;
        this.status = status;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
