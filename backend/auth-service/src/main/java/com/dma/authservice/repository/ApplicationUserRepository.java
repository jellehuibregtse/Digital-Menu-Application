package com.dma.authservice.repository;

import com.dma.authservice.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The repository for getting users from the database.
 *
 * @author Jelle Huibregtse
 */
@Repository
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    Optional<ApplicationUser> findByEmail(String email);
}