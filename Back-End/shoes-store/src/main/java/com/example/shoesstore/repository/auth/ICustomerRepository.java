package com.example.shoesstore.repository.auth;


import com.example.shoesstore.model.account.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

/**
 * Class ICustomerRepository extends class JpaRepository.
 * @author: ThanhPV
 * @date: 12/12/2023
 */
public interface ICustomerRepository extends JpaRepository<Customer,Long> {

    /**
     * Get information Customer
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param id to find by idAccount
     * @return Customer
     */
    @Query(value = "SELECT * FROM Customers as e WHERE e.account_id = :id", nativeQuery = true)
    Customer getCustomerByAccountId(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Customers SET name = :name, birthday = :birthday, phone = :phone, email = :email, address = :address WHERE account_id = :accountId", nativeQuery = true)
    void updateCustomer(@Param("accountId") Long accountId, @Param("name") String name, @Param("birthday") String birthday, @Param("phone") String phone, @Param("email") String email, @Param("address") String address);


    @Query(value = "SELECT e.id from Customers e join accounts a " +
            "on e.account_id = a.id where username = :username", nativeQuery = true)
    Long getCustomerIdByUsername(@Param("username") String username);
}
