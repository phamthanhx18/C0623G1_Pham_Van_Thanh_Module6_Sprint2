package com.example.shoesstore.repository.auth;

import com.example.shoesstore.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Class IAccountRepository extends class JpaRepository.
 * @author: ThanhPV
 * @date: 12/12/2023
 */
public interface IAccountRepository extends JpaRepository<Account,Long> {

    /**
     * Get Information Account by Username
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username to find username
     * @return Optional<Account>
     */
    @Query(value = "SELECT * FROM accounts as a WHERE a.username = :username", nativeQuery = true)
    Optional<Account> findByUsername(@Param("username") String username);

    /**
     * Check exist Account by Username
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username to find username
     * @return Boolean
     */
    @Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM accounts as a WHERE a.username = :username", nativeQuery = true)
    Boolean existsByUsername(@Param("username") String username);

    /**
     * Modifies the accounts table to update the password for a specific username.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param username The username of the account.
     * @param password The new password to be set.
     */
    @Modifying
    @Transactional
    @Query(value = "UPDATE accounts SET password = :password WHERE username = :username", nativeQuery = true)
    void updatePasswordAccount(@Param("username") String username, @Param("password") String password);
    /**
     * Get account by email
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param email The email of the account.
     */
    @Query(value = "SELECT accounts.* FROM accounts JOIN employees ON accounts.id = employees.account_id WHERE employees.email = :email", nativeQuery = true)
    Account getAccountByEmail(@Param("email") String email);
}
