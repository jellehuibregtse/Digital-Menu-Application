package com.dma.orderservice.repositories;

import com.dma.orderservice.models.OrderM;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<OrderM, Long> {

}