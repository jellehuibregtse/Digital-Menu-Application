package com.dma.inventoryservice.repository;

import com.dma.inventoryservice.model.Inventory;
import com.dma.inventoryservice.model.InventoryItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends CrudRepository<Inventory, Long> {

    Optional<InventoryItem> findByName(String name);
}
