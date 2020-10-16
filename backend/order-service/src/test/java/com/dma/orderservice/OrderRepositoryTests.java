package com.dma.orderservice;

import com.dma.orderservice.models.CustomerOrder;
import com.dma.orderservice.models.OrderItem;
import com.dma.orderservice.models.Status;
import com.dma.orderservice.repositories.OrderRepository;
import com.google.common.collect.Lists;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.Collection;

/**
 * Repository Unit tests.
 *
 * @author Jelle Huibregtse
 */
@DataJpaTest
@ActiveProfiles("test")
public class OrderRepositoryTests {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TestEntityManager entityManager;

    private CustomerOrder orderOne;
    private CustomerOrder orderTwo;
    private CustomerOrder orderThree;

    @BeforeEach
    public void setup() {
        OrderItem steak = new OrderItem("Steak", 1, Status.NEW);
        OrderItem salmon = new OrderItem("Salmon", 2, Status.COMPLETE);

        orderOne = new CustomerOrder(Status.NEW, 1L, 1, Lists.newArrayList(steak, salmon));
        orderTwo = new CustomerOrder(Status.PROCESSING, 1L, 1, Lists.newArrayList());
        orderThree = new CustomerOrder(Status.COMPLETE, 1L, 1, Lists.newArrayList());

        persistAll(Lists.newArrayList(orderOne, orderTwo, orderThree));
    }

    @Test
    public void amountOfOrdersInDatabase() {
        Assert.assertEquals(3, Lists.newArrayList(orderRepository.findAll()).size());
    }

    @Test
    public void getOrdersFromDatabase() {
        var orders = Lists.newArrayList(orderRepository.findAllByRestaurantId(1L));
        var orderOne = orders.get(0);
        var orderTwo = orders.get(1);
        var orderThree = orders.get(2);

        Assert.assertEquals(3, orders.size());
        Assert.assertEquals(orderOne, this.orderOne);
        Assert.assertEquals(orderTwo, this.orderTwo);
        Assert.assertEquals(orderThree, this.orderThree);
    }

    @Test
    public void orderWithIdFourDoesNotExistInDatabase() {
        var orderFour = orderRepository.findById(4L);

        Assert.assertFalse(orderFour.isPresent());
    }

    @Test
    public void orderWithNegativeIdDoesNotExistInDatabase() {
        var orderFour = orderRepository.findById(-1L);

        Assert.assertFalse(orderFour.isPresent());
    }

    @Test
    public void addingOrderToDatabaseIsSuccessful() {
        var order = new CustomerOrder(Status.NEW, 1L, 1, Lists.newArrayList());

        orderRepository.save(order);

        var orderFromDatabase = orderRepository.findById(order.getId());
        Assert.assertTrue(orderFromDatabase.isPresent());
        Assert.assertEquals(order, orderFromDatabase.get());

    }

    private void persistAll(Collection<?> entities) {
        for (var entity : entities) {
            entityManager.persist(entity);
        }
    }
}
