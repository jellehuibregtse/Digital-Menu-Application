package com.dma.inventoryservice.repository;

import com.dma.inventoryservice.model.Inventory;
import com.dma.inventoryservice.model.InventoryItem;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface InventoryRepository extends CrudRepository<Inventory, Long> {

    Optional<InventoryItem> findByName(String name);
}
