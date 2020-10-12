package com.dma.orderservice.repositories;

import com.dma.orderservice.models.CustomerOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * The order repository.
 *
 * @author Jelle Huibregtse
 */
@Repository
public interface OrderRepository extends CrudRepository<CustomerOrder, Long> {

    Iterable<CustomerOrder> findAllByRestaurantId(long restaurantId);
}