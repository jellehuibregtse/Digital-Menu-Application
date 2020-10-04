package com.dma.orderservice.controllers;

import com.dma.orderservice.models.CustomerOrder;
import com.dma.orderservice.repositories.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

/**
 * The controller that handles all the mappings for the order service.
 *
 * @author Jelle Huibregtse
 */
@RequestMapping("/orders")
@CrossOrigin
@RestController
public class OrderController {

    private final OrderRepository orderRepository;
    private final SimpMessagingTemplate template;

    public OrderController(OrderRepository orderRepository, SimpMessagingTemplate template) {
        this.orderRepository = orderRepository;
        this.template = template;
    }

    /**
     * Get a list of all orders.
     *
     * @return <code>ResponseEntity</code> with a list of orders and HTTP status OK.
     */
    @GetMapping("/")
    public ResponseEntity<?> getAllOrder() {
        var orders = orderRepository.findAll();

        template.convertAndSend("/topic/orders/" + "0", orders);

        return ResponseEntity.ok(orders);
    }

    /**
     * Get a single order by ID.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a order and HTTP status OK or message and HTTP status BadRequest.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable long id) {
        var order = orderRepository.findById(id);

        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }

    /**
     * Create a order.
     *
     * @param order that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping("/")
    public ResponseEntity<?> createOrder(@RequestBody CustomerOrder order) {
        return ResponseEntity.ok(String.format("Order, %s has been successfully created!", order.getId()));
    }

    /**
     * Delete a single order.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenu(@PathVariable long id) {
        var order = orderRepository.findById(id);

        if (order.isPresent()) {
            orderRepository.delete(order.get());
            return ResponseEntity.ok(String.format("Order, %s has been successfully deleted!", id));
        }

        return ResponseEntity.badRequest().body("Order has not been found.");
    }

    /**
     * Update a single order.
     *
     * @param order that needs to be updated
     * @return message and HTTP status OK or HTTP status BadRequest.
     */
    @PutMapping("/")
    public ResponseEntity<?> updateOrder(@RequestBody CustomerOrder order) {
        var orderFromRepository = orderRepository.findById(order.getId());

        if (orderFromRepository.isPresent()) {
            CustomerOrder updatedOrder = orderFromRepository.get();
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
