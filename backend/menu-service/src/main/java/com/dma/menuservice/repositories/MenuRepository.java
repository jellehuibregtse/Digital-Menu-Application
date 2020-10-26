package com.dma.menuservice.repositories;

import com.dma.menuservice.models.Menu;
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
