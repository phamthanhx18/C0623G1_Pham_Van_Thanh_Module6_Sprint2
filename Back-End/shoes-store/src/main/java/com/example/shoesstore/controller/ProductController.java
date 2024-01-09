package com.example.shoesstore.controller;

import com.example.shoesstore.dto.Filter;
import com.example.shoesstore.dto.VariantDTO;
import com.example.shoesstore.model.product.*;
import com.example.shoesstore.service.product.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/product")
@RestController
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private ISizeService sizeService;
    @Autowired
    private ISizeVariantService sizeVariantService;
    @Autowired
    private IProductVariantService productVariantService;
    @Autowired
    private IAlbumsVariantService albumsVariantService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct(){
        List<Product> productList = productService.getAllProduct();
        if (productList.size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productList,HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Product>> getAllProducts(@PageableDefault(size = 10)Pageable pageable){
        Page<Product> productPage = productService.getAllProduct(pageable);
        if (productPage.toList().size() == 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(productPage,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Product product = productService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @GetMapping("/get-size/{idVariant}")
    public ResponseEntity<?> getProductByIdVariant(@PathVariable Long idVariant){
        return ResponseEntity.ok(sizeService.findSizesByProductVariantId(idVariant));
    }
    @GetMapping("/get-price-filter")
    public ResponseEntity<?> getPriceMaxAndMin(){
        return ResponseEntity.ok(productService.findMaxPrice());
    }

    @PostMapping("/filter")
    public ResponseEntity<?> filterProduct(@RequestBody Filter filter){
        List<Product> productList = productService.filterProducts(filter.getCategories(),filter.getColor(),filter.getSize(),filter.getPriceFilterMin(),filter.getPriceFilterMax());
        return ResponseEntity.ok(productList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> filterProduct(@RequestBody Product product){
        try {
            productService.saveProduct(product);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/{id}/add-variant")
    public ResponseEntity<?> addVariant(@RequestBody VariantDTO variantDTO, @PathVariable Long id){
        Product product = productService.getProductById(id);
        ProductVariant productVariant = new ProductVariant();
        BeanUtils.copyProperties(variantDTO,productVariant);
        productVariant.setProduct(product);
        productVariantService.save(productVariant);
        for (Size size:variantDTO.getSize()) {
            SizeVariant sizeVariant = new SizeVariant();
            sizeVariant.setProductVariant(productVariant);
            sizeVariant.setSize(size);
            sizeVariantService.save(sizeVariant);
        }
        for (String image: variantDTO.getAlbumsVariant()) {
            AlbumsVariant albumsVariant = new AlbumsVariant();
            albumsVariant.setImage(image);
            albumsVariant.setProductVariant(productVariant);
            albumsVariantService.save(albumsVariant);
        }
        return ResponseEntity.ok("Thành công !");
    }
}
