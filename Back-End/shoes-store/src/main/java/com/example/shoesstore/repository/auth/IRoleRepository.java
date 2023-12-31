package com.example.shoesstore.repository.auth;

import com.example.shoesstore.model.account.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * Class IRoleRepository extends class JpaRepository.
 * @author: ThanhPV
 * @date: 12/12/2023
 */
public interface IRoleRepository extends JpaRepository<Role,Long> {

    /**
     * Get Role by name
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param name to find by name Role
     * @return Optional<Role>
     */
    @Query(value = "SELECT * FROM roles WHERE name = :name", nativeQuery = true)
    Optional<Role> findByName(@Param("name") String name);
}
