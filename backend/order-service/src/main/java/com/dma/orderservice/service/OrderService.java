package com.dma.orderservice.service;

import com.dma.orderservice.model.CustomerOrder;
import com.dma.orderservice.repository.OrderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    private final OrderRepository repository;
    private final SimpMessagingTemplate template;

    @Autowired
    public OrderService(OrderRepository repository, SimpMessagingTemplate template) {
        this.repository = repository;
        this.template = template;
    }

    @Override
    public ResponseEntity<List<CustomerOrder>> findAllOrders(long restaurantId) {
        return ResponseEntity.ok(Lists.newArrayList(repository.findAllByRestaurantId(restaurantId)));
    }

    @Override
    public ResponseEntity<CustomerOrder> findOrder(long id) {return ResponseEntity.ok(repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found.")));
    }

    @Override
    public ResponseEntity<String> addOrder(CustomerOrder order) {
        repository.save(order);

        sendMessage(order.getRestaurantId());

        return ResponseEntity.ok(String.format("Order, %s has been successfully created!", order.getId()));
    }

    @Override
    public ResponseEntity<String> updateOrder(CustomerOrder updatedOrder, long id) {
        repository.findById(id).map(order -> {
            order.setRestaurantId(updatedOrder.getRestaurantId());
            order.setStatus(updatedOrder.getStatus());
            order.setTableNumber(updatedOrder.getTableNumber());
            order.setItems(updatedOrder.getItems());
            return repository.save(order);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found."));

        return ResponseEntity.ok(String.format("Order, %s has been successfully updated!", id));
    }

    @Override
    public ResponseEntity<String> deleteOrder(long id) {
        var order = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        repository.delete(order);

        return ResponseEntity.ok(String.format("Order, %s has been successfully deleted!", id));
    }

    protected void sendMessage(long restaurantId) {
        try {
            template.convertAndSend("/orders/" + restaurantId, new ObjectMapper().writeValueAsString(Lists.newArrayList(repository.findAllByRestaurantId(restaurantId))));
        } catch (JsonProcessingException ignore) {}
    }
}
