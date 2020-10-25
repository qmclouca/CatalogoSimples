package com.rlbpc.catalogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rlbpc.catalogo.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

}
