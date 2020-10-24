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
import com.rlbpc.catalogo.entities.Category;
import com.rlbpc.catalogo.repositories.CategoryRepository;
import com.rlbpc.catalogo.services.exceptions.DatabaseException;
import com.rlbpc.catalogo.services.exceptions.ResourceNotFoundException;


/*Anotação para registro da classe como componente de injeção de dependência automatizado do Spring
as anotações possíveis são @Component componente genérico, @Repository se for repositório @Service para serviços*/

@Service
public class CategoryService {
	
	
	//dependência variável para acessar o repository e chamar do bando de dados as categorias
	//para injetar o CategoryRepository deve ser criada uma anotação @Repository na classe category repository
	//para que o Spring faça a injeção automática de objetos gerenciados por ele e portanto já marcados como @Repository deve ser inclusa a anotação @Autowired
	@Autowired
	private CategoryRepository repository;
	
	
	//A anotação Transactional garante que o método vai ser executado com uma transação do banco de dados e o método readOnly impede que o banco de dados seja travado para uma operação que é apenas de leitura
	//deve-se colocar no perfil de execução application-properties a linha spring.jpa.open-in-view=false para garantir que todas as transações com o banco de dados fiquem na camada de serviço sem chegar a camada de controladores REST
	
	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(PageRequest pageRequest){
		Page<Category> list = repository.findAll(pageRequest); 
		return list.map(x -> new CategoryDTO(x));
	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {
		Optional<Category> obj = repository.findById(id);
		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found - Entidade não encontrada."));
		return new CategoryDTO(entity);
	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {
		Category entity = new Category();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new CategoryDTO(entity);
	}

	@Transactional	
	public CategoryDTO update(Long id, CategoryDTO dto) {
		try {
			Category entity = repository.getOne(id); // usar para atualizar o banco de dados
			entity.setName(dto.getName());
			entity = repository.save(entity);
			return new CategoryDTO(entity);
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
}
