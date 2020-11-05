package com.dma.menuservice.repository;

import com.dma.menuservice.model.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

/**
 * The menu repository.
 *
 * @author Jelle Huibregtse
 */
public interface MenuRepository extends CrudRepository<Menu, Long> {

    Optional<Menu> findByName(String name);
}
