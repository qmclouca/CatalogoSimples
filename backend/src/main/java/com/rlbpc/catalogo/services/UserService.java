package com.rlbpc.catalogo.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rlbpc.catalogo.dto.RoleDTO;
import com.rlbpc.catalogo.dto.UserDTO;
import com.rlbpc.catalogo.dto.UserInsertDTO;
import com.rlbpc.catalogo.dto.UserUpdateDTO;
import com.rlbpc.catalogo.entities.Role;
import com.rlbpc.catalogo.entities.User;
import com.rlbpc.catalogo.repositories.RoleRepository;
import com.rlbpc.catalogo.repositories.UserRepository;
import com.rlbpc.catalogo.services.exceptions.DatabaseException;
import com.rlbpc.catalogo.services.exceptions.ResourceNotFoundException;


/*Anotação para registro da classe como componente de injeção de dependência automatizado do Spring
as anotações possíveis são @Component componente genérico, @Repository se for repositório @Service para serviços*/

@Service
public class UserService implements UserDetailsService {
	
	private static Logger Logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	
	//dependência variável para acessar o repository e chamar do bando de dados as categorias
	//para injetar o UserRepository deve ser criada uma anotação @Repository na classe category repository
	//para que o Spring faça a injeção automática de objetos gerenciados por ele e portanto já marcados como @Repository deve ser inclusa a anotação @Autowired
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
		
	//A anotação Transactional garante que o método vai ser executado com uma transação do banco de dados e o método readOnly impede que o banco de dados seja travado para uma operação que é apenas de leitura
	//deve-se colocar no perfil de execução application-properties a linha spring.jpa.open-in-view=false para garantir que todas as transações com o banco de dados fiquem na camada de serviço sem chegar a camada de controladores REST
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(PageRequest pageRequest){
		Page<User> list = repository.findAll(pageRequest); 
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found - Entidade não encontrada."));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto,entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = repository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional	
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = repository.getOne(id); // usar para atualizar o banco de dados
			copyDtoToEntity(dto,entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
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
	
	private void copyDtoToEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		
		entity.getRoles().clear();
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getOne(roleDto.getId());
			entity.getRoles().add(role);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByEmail(username);
		if (user == null) {
			Logger.error("User not found: " + username);
			throw new UsernameNotFoundException("Email not found");
		} 
		Logger.info("User found: " + username);
		// TODO Auto-generated method stub
		return user;
	}

}
