package com.dma.authservice.services;

import com.dma.authservice.auth.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * A service that loads user data from the repository.
 *
 * @author Jelle Huibregtse
 */
@Service
public class ApplicationUserService implements UserDetailsService {

    private final ApplicationUserRepository applicationUserRepository;

    @Autowired
    public ApplicationUserService(ApplicationUserRepository applicationUserDao) {
        this.applicationUserRepository = applicationUserDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return applicationUserRepository.findByUsername(username)
                                        .orElseThrow(() -> new UsernameNotFoundException(String.format(
                                                "Username %s not found",
                                                username)));
    }
}
