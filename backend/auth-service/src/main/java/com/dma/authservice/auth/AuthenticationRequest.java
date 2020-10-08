package com.dma.authservice.auth;

/**
 * A simple model that holds the username and password of an authentication request.
 *
 * @author Jelle Huibregtse
 */
public class AuthenticationRequest {

    private String username;
    private String password;

    public AuthenticationRequest() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
