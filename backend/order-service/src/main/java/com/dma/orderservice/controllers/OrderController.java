package com.dma.orderservice.controllers;

import com.dma.orderservice.models.OrderM;
import com.dma.orderservice.repositories.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/order")
@CrossOrigin
@RestController
public class OrderController {

    private final OrderRepository orderRepository;
    private final SimpMessagingTemplate template;

    public OrderController(OrderRepository orderRepository, SimpMessagingTemplate template) {
        this.orderRepository = orderRepository;
        this.template = template;
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllOrder(@RequestParam long restaurantId) {
        var order = orderRepository.findById(restaurantId);

        if (order.isPresent()) {
            template.convertAndSend("/topic/orders/" + restaurantId, order.get());
            return ResponseEntity.ok("Order has been send.");
        }

        return ResponseEntity.badRequest().body("Order could not be found.");
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
    public ResponseEntity<?> addOrder(@RequestBody OrderM order) {
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
    public ResponseEntity<?> updateOrder(@RequestBody OrderM order) {
        var orderFromRepository = orderRepository.findById(order.getId());

        if (orderFromRepository.isPresent()) {
            OrderM updatedOrder = orderFromRepository.get();
            updatedOrder.setRestaurantId(order.getRestaurantId());
            updatedOrder.setItemIDs(order.getItemIDs());
            updatedOrder.setStatus(order.getStatus());
            updatedOrder.setTableNumber(order.getTableNumber());

            orderRepository.save(updatedOrder);
            return ResponseEntity.ok(String.format("Order, %s has been successfully updated!", order.getId()));
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }
}
