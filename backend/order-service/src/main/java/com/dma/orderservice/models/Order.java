package com.dma.orderservice.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private long restaurantId;

    @NotNull
    private int tableNumber;

    @NotNull
    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<MenuItem> items;

    @NotNull
    @CreatedDate
    private LocalDateTime createdDateTime;
}
