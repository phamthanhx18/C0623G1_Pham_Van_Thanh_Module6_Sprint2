package com.example.shoesstore.service.auth;

import com.example.shoesstore.model.account.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService {
    /**
     * Finds a role by name.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param name The name of the role.
     * @return An optional containing the role if found, or an empty optional if not found.
     */
    Optional<Role> findByName(String name);
    List<Role> findRole();

    Role findRolebyName(String roleCustomer);
}
