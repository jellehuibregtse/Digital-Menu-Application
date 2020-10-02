package com.dma.orderservice.repositories;

import com.dma.orderservice.models.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {

}
