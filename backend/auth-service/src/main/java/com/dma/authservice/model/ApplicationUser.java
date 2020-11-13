package com.dma.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * The application user model.
 *
 * @author Jelle Huibregtse
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private @NotNull String email;
    private @NotNull String password;
    @ElementCollection
    private Map<Long, String> restaurantAuthorities;
}