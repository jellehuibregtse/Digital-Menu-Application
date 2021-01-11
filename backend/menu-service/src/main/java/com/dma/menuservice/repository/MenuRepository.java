package com.dma.menuservice.repository;

import com.dma.menuservice.model.Menu;
import com.dma.menuservice.model.MenuItem;
import org.checkerframework.checker.nullness.Opt;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

/**
 * The menu repository.
 *
 * @author Jelle Huibregtse
 */
public interface MenuRepository extends CrudRepository<Menu, Long> {

    Optional<Menu> findByName(String name);
    
    Optional<List<Menu>> findByRestaurantId(long id);
}
