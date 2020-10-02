package com.dma.menuservice.repositories;

import com.dma.menuservice.models.Menu;
import org.springframework.data.repository.CrudRepository;

public interface MenuRepository extends CrudRepository<Menu, Long> {

}
