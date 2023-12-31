package com.example.shoesstore.service.auth.impl;

import com.example.shoesstore.model.account.Account;
import com.example.shoesstore.repository.auth.IAccountRepository;
import com.example.shoesstore.service.auth.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AccountService implements IAccountService {
    @Autowired
    private IAccountRepository accountRepository;

    /**
     * This method finds an account by username.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username The username.
     * @return An optional containing the account if found, or an empty optional if not found.
     */
    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    /**
     * This method checks if an account exists by username.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username The username.
     * @return true if the account exists, false otherwise.
     */
    @Override
    public Boolean existsByUsername(String username) {
        return accountRepository.existsByUsername(username);
    }

    /**
     * This method update Password an account.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param account The account to be updated.
     */
    @Override
    public void updatePassword(Account account) {
        accountRepository.updatePasswordAccount(account.getUsername(), account.getPassword());
    }

    @Override
    public Account getAccountByEmail(String email) {
        return accountRepository.getAccountByEmail(email);
    }
}
