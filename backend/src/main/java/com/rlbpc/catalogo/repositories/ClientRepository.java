package com.rlbpc.catalogo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rlbpc.catalogo.entities.Client;

//A anotação @Repository declara que esta classe é um repositório que pode ser injetado e o Spring passa a gerenciar os objetos desta classe
@Repository
public interface ClientRepository extends JpaRepository<Client, Long>{
//Implementação de operações padrões para acesso a banco de dados
	//Essa é a implemetação da camada de acesso a dados
}
