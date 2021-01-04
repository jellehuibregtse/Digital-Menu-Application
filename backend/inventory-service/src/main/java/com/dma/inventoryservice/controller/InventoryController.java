package com.dma.inventoryservice.controller;

import com.dma.inventoryservice.model.Inventory;
import com.dma.inventoryservice.model.InventoryItem;
import com.dma.inventoryservice.repository.InventoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryRepository repository;

    public InventoryController(InventoryRepository repository){
        this.repository = repository;
    }

    @GetMapping("{id}")
    public ResponseEntity<Inventory> getInventory(@PathVariable long id)
    {
        Inventory result = repository.findById(id).orElseThrow(() -> new ResourceAccessException("Not found."));
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<String> createMenu(@RequestBody Inventory inv)
    {
        repository.save(inv);
        return ResponseEntity.ok(String.format("Inventory with name : %s created!",inv.getName()));
    }

//    @PostMapping
//    public ResponseEntity<String> createMenu(@RequestBody long id, long restaurantId, String name)
//    {
//        List<InventoryItem> empty = new LinkedList<>();
//        Inventory placeholder = new Inventory(id,restaurantId,name,empty);
//        repository.save(placeholder);
//        return ResponseEntity.ok(String.format("Inventory with name : %s created!",placeholder.getName()));
//    }

    
    @PutMapping
    public ResponseEntity<String> updateInventory(@RequestBody Inventory inv, @PathVariable long id)
    {
        Inventory updatedInv =  repository.findById(id).orElseThrow(() -> new ResourceAccessException("Not found."));
        updatedInv.setRestaurantId(inv.getRestaurantId());
        updatedInv.setItems(inv.getItems());
        updatedInv.setName(inv.getName());

        return ResponseEntity.ok(String.format("Succesfully updated inventory for restaurant id :  %s",updatedInv.getRestaurantId()));

    }

    @DeleteMapping
    public ResponseEntity<Inventory> deleteInventory(@PathVariable long id)
    {
        Inventory deletedInv = repository.findById(id).orElseThrow(() -> new ResourceAccessException("Not found."));
        repository.delete(deletedInv);

        return ResponseEntity.ok(deletedInv);
    }


}
