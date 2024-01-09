package com.example.shoesstore.service.product.impl;

import com.example.shoesstore.model.product.AlbumsVariant;
import com.example.shoesstore.repository.product.IAlbumsVariantRepository;
import com.example.shoesstore.service.product.IAlbumsVariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumsVariantService implements IAlbumsVariantService {
    @Autowired
    private IAlbumsVariantRepository albumsVariantRepository;
    @Override
    public void save(AlbumsVariant albumsVariant) {
        albumsVariantRepository.save(albumsVariant);
    }
}
