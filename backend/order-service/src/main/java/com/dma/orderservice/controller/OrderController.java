package com.dma.orderservice.controller;

import com.dma.orderservice.exceptions.ResourceNotFoundException;
import com.dma.orderservice.model.CustomerOrder;
import com.dma.orderservice.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * The controller that handles all the mappings for the order service.
 *
 * @author Jelle Huibregtse
 * @author Aron Hemmes
 */
@RequestMapping("/orders")
@RestController
public class OrderController {

    private final OrderRepository repository;
    private final SimpMessagingTemplate template;

    public OrderController(OrderRepository repository, SimpMessagingTemplate template) {
        this.repository = repository;
        this.template = template;
    }

    /**
     * Get a list of all orders.
     *
     * @return <code>ResponseEntity</code> with a list of orders and HTTP status OK.
     */
    @GetMapping("restaurant/{restaurantId}")
    public ResponseEntity<List<CustomerOrder>> getAllOrders(@PathVariable long restaurantId) {
        List<CustomerOrder> result = new ArrayList<>();
        repository.findAllByRestaurantId(restaurantId).forEach(result::add);

        sendMessage(restaurantId);

        return ResponseEntity.ok(result);
    }

    /**
     * Get a single order by ID.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a order and HTTP status OK or message and HTTP status BadRequest.
     */
    @GetMapping("{id}")
    public ResponseEntity<CustomerOrder> getOrder(@PathVariable long id) {
        CustomerOrder result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found."));
        return ResponseEntity.ok(result);
    }

    /**
     * Create an order.
     *
     * @param order that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CustomerOrder order) {
        repository.save(order);

        sendMessage(order.getRestaurantId());

        return ResponseEntity.ok(String.format("Order, %s has been successfully created!", order.getId()));
    }

    /**
     * Delete a single order.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable long id) {
        var order = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));

        repository.delete(order);

        return ResponseEntity.ok(String.format("Order, %s has been successfully deleted!", id));
    }

    /**
     * Update a single order.
     *
     * @param order that needs to be updated
     * @return message and HTTP status OK or HTTP status BadRequest.
     */
    @PutMapping
    public ResponseEntity<String> updateOrder(@RequestBody CustomerOrder order) {
        CustomerOrder updatedOrder =
                repository.findById(order.getId()).orElseThrow(() -> new ResourceNotFoundException("Not found."));

        updatedOrder.setRestaurantId(order.getRestaurantId());
        updatedOrder.setItems(order.getItems());
        updatedOrder.setStatus(order.getStatus());
        updatedOrder.setTableNumber(order.getTableNumber());
        repository.save(updatedOrder);

        return ResponseEntity.ok(String.format("Order, %s has been successfully updated!", order.getId()));
    }

    private void sendMessage(long restaurantId) {
        template.convertAndSend("/topic/orders/" + restaurantId, repository.findAll());
    }
}
