package com.dma.orderservice.service;

import com.dma.orderservice.model.CustomerOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IOrderService {

    ResponseEntity<List<CustomerOrder>> findAllOrders(long restaurantId);

    ResponseEntity<CustomerOrder> findOrder(long id);

    ResponseEntity<String> addOrder(CustomerOrder order);

    ResponseEntity<String> updateOrder(CustomerOrder updatedOrder, long id);

    ResponseEntity<String> deleteOrder(long id);
}

