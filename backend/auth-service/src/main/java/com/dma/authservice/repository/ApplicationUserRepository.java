package com.dma.authservice.repository;

import com.dma.authservice.auth.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The repository for getting users from the database.
 *
 * @author Jelle Huibregtse
 */
@Repository
public interface ApplicationUserRepository extends CrudRepository<ApplicationUser, Long> {

    Optional<ApplicationUser> findByUsername(String username);

    @Override
    Optional<ApplicationUser> findById(Long id);
}
