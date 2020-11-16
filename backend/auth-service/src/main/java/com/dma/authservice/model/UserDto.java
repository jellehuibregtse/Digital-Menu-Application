package com.dma.authservice.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * A data transfer object to return when client requests information.
 *
 * @author Jelle Huibregtse
 */
@Getter
@Setter
public class UserDto {

    private long id;
    private Map<Long, String> restaurantAuthorities;
}
