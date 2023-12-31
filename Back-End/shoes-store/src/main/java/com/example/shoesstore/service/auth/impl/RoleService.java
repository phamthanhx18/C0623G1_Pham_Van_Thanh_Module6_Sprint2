package com.example.shoesstore.service.auth.impl;

import com.example.shoesstore.model.account.Role;
import com.example.shoesstore.repository.auth.IRoleRepository;
import com.example.shoesstore.service.auth.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;

    /**
     * This method finds a role by name.
     * @author: ThanhPV
     * @date: 02/01/2024
     * @param name The name of the role.
     * @return An optional containing the role if found, or an empty optional if not found.
     */
    @Override
    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<Role> findRole() {
        return roleRepository.findAll();
    }
}
