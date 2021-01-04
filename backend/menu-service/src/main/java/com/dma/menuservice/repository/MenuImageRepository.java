package com.dma.menuservice.repository;

import com.dma.menuservice.model.MenuImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenuImageRepository extends CrudRepository<MenuImage, Long> {

    Optional<MenuImage> findByName(String name);
}
