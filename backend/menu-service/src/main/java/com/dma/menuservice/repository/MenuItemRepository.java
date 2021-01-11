package com.dma.menuservice.repository;

import com.dma.menuservice.model.MenuItem;
import org.springframework.data.repository.CrudRepository;

public interface MenuItemRepository extends CrudRepository<MenuItem, Long> {}