package com.rlbpc.catalogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rlbpc.catalogo.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{

}
