package com.dma.orderservice.controllers;

import com.dma.orderservice.models.Order;
import com.dma.orderservice.repositories.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/order")
@CrossOrigin
@RestController
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/get")
    public ResponseEntity<?> getOrder(@RequestParam long orderId) {
        var order = orderRepository.findById(orderId);

        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody Order order) {
        return ResponseEntity.ok(String.format("Order, %s has been successfully created!", order.getId()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMenu(@RequestParam long orderId) {
        var order = orderRepository.findById(orderId);

        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return ResponseEntity.ok(String.format("Order, %s has been successfully deleted!", orderId));
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateOrder(@RequestBody Order order) {
        var orderFromRepository = orderRepository.findById(order.getId());

        if (orderFromRepository.isPresent()) {
            var updatedOrder = orderFromRepository.get();
            updatedOrder.setRestaurantId(order.getRestaurantId());
            updatedOrder.setItems(order.getItems());
            updatedOrder.setStatus(order.getStatus());
            updatedOrder.setTableNumber(order.getTableNumber());

            orderRepository.save(updatedOrder);
            return ResponseEntity.ok(String.format("Order, %s has been successfully updated!", order.getId()));
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }
}
