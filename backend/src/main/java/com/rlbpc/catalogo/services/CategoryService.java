package com.rlbpc.catalogo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rlbpc.catalogo.entities.Category;
import com.rlbpc.catalogo.repositories.CategoryRepository;


/*Anotação para registro da classe como componente de injeção de dependência automatizado do Spring
as anotações possíveis são @Component componente genérico, @Repository se for repositório @Service para serviços*/

@Service
public class CategoryService {
	
	
	//dependência variável para acessar o repository e chamar do bando de dados as categorias
	//para injetar o CategoryRepository deve ser criada uma anotação @Repository na classe category repository
	//para que o Spring faça a injeção automática de objetos gerenciados por ele e portanto já marcados como @Repository deve ser inclusa a anotação @Autowired
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		return repository.findAll();
		
	}
}
