package com.example.shoesstore.service.auth.impl;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.model.account.MyUserDetail;
import com.example.shoesstore.repository.auth.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * This class implements the UserDetailsService interface for loading user details.
 */
@Service
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    private IAccountRepository accountRepository;

    /**
     * This method loads user details by username.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username The username.
     * @return The user details of the specified username.
     * @throws UsernameNotFoundException If the username is not found.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " không tồn tại"));
        return new MyUserDetail(account);
    }
}
