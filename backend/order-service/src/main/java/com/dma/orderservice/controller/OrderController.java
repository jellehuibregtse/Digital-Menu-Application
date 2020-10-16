package com.dma.orderservice.controller;

import com.dma.orderservice.model.CustomerOrder;
import com.dma.orderservice.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    private final IOrderService orderService;

    @Autowired
    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * Get a list of all orders.
     *
     * @return <code>ResponseEntity</code> with a list of orders and HTTP status OK.
     */
    @GetMapping("restaurant/{restaurantId}")
    public ResponseEntity<List<CustomerOrder>> getAllOrders(@PathVariable long restaurantId) {
        return orderService.findAllOrders(restaurantId);
    }

    /**
     * Get a single order by ID.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a order and HTTP status OK or message and HTTP status BadRequest.
     */
    @GetMapping("{id}")
    public ResponseEntity<CustomerOrder> getOrder(@PathVariable long id) {
        return orderService.findOrder(id);
    }

    /**
     * Create an order.
     *
     * @param order that needs to be created.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CustomerOrder order) {
        return orderService.addOrder(order);
    }

    /**
     * Delete a single order.
     *
     * @param id of the order.
     * @return <code>ResponseEntity</code> with a message and HTTP status OK.
     */
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable long id) {
        return orderService.deleteOrder(id);
    }

    /**
     * Update a single order.
     *
     * @param order that needs to be updated
     * @return message and HTTP status OK or HTTP status BadRequest.
     */
    @PutMapping("{id}")
    public ResponseEntity<String> updateOrder(@RequestBody CustomerOrder order, @PathVariable long id) {
        return orderService.updateOrder(order, id);
    }
}
