package com.dma.authservice.auth;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.Set;

/**
 * The application user model.
 *
 * @author Jelle Huibregtse
 */
@Entity
public class ApplicationUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @ElementCollection
    private Set<GrantedAuthority> grantedAuthorities;
    @NotNull
    private boolean isAccountNonExpired;
    @NotNull
    private boolean isAccountNonLocked;
    @NotNull
    private boolean isCredentialsNonExpired;
    @NotNull
    private boolean isEnabled;

    public ApplicationUser() {}

    public ApplicationUser(@NotNull String username,
                           @NotNull String password,
                           Set<GrantedAuthority> grantedAuthorities) {
        this(username, password, grantedAuthorities, true, true, true, true);
    }

    public ApplicationUser(@NotNull String username,
                           @NotNull String password,
                           Set<GrantedAuthority> grantedAuthorities,
                           @NotNull boolean isAccountNonExpired,
                           @NotNull boolean isAccountNonLocked,
                           @NotNull boolean isCredentialsNonExpired,
                           @NotNull boolean isEnabled) {
        this.username = username;
        this.password = password;
        this.grantedAuthorities = grantedAuthorities;
        this.isAccountNonExpired = isAccountNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
        this.isCredentialsNonExpired = isCredentialsNonExpired;
        this.isEnabled = isEnabled;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
