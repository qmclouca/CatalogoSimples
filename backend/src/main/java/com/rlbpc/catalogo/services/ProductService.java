package com.rlbpc.catalogo.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rlbpc.catalogo.dto.CategoryDTO;
import com.rlbpc.catalogo.dto.ProductDTO;
import com.rlbpc.catalogo.entities.Category;
import com.rlbpc.catalogo.entities.Product;
import com.rlbpc.catalogo.repositories.CategoryRepository;
import com.rlbpc.catalogo.repositories.ProductRepository;
import com.rlbpc.catalogo.services.exceptions.DatabaseException;
import com.rlbpc.catalogo.services.exceptions.ResourceNotFoundException;


/*Anotação para registro da classe como componente de injeção de dependência automatizado do Spring
as anotações possíveis são @Component componente genérico, @Repository se for repositório @Service para serviços*/

@Service
public class ProductService {
	
	
	//dependência variável para acessar o repository e chamar do bando de dados as categorias
	//para injetar o ProductRepository deve ser criada uma anotação @Repository na classe category repository
	//para que o Spring faça a injeção automática de objetos gerenciados por ele e portanto já marcados como @Repository deve ser inclusa a anotação @Autowired
	@Autowired
	private ProductRepository repository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	//A anotação Transactional garante que o método vai ser executado com uma transação do banco de dados e o método readOnly impede que o banco de dados seja travado para uma operação que é apenas de leitura
	//deve-se colocar no perfil de execução application-properties a linha spring.jpa.open-in-view=false para garantir que todas as transações com o banco de dados fiquem na camada de serviço sem chegar a camada de controladores REST
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest){
		Page<Product> list = repository.findAll(pageRequest); 
		return list.map(x -> new ProductDTO(x));
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found - Entidade não encontrada."));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto,entity);
		if (entity.getCategories().size() == 0) {
			Category cat = categoryRepository.getOne(1L);
			entity.getCategories().add(cat);
		}
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional	
	public ProductDTO update(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id); // usar para atualizar o banco de dados
			copyDtoToEntity(dto,entity);
			if (entity.getCategories().size() == 0) {
				Category cat = categoryRepository.getOne(1L);
				entity.getCategories().add(cat);
			}			
			entity = repository.save(entity);
			return new ProductDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found" + id);
		}

	}

	public void delete(Long id) {
		try {
		repository.deleteById(id);
	}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Database integrity violation");
		}
	}
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for (CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}
	}

}
