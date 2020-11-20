package com.dma.authservice.model;

import lombok.*;

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
    @Setter(AccessLevel.PROTECTED)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique=true)
    private @NotNull String email;
    private @NotNull String password;
}