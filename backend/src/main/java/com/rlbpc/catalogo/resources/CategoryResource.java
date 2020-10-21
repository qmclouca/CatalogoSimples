package com.rlbpc.catalogo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rlbpc.catalogo.dto.CategoryDTO;
import com.rlbpc.catalogo.services.CategoryService;

//Declaração da categoria como sendo o controlador REST
@RestController
@RequestMapping(value = "/categories")
public class CategoryResource {
	
	//declaração de dependência do category service para a injeção automática da dependência de um dos objetos gerenciados pelo Spring deve-se colocar a anotação @Autowired
	@Autowired
	private CategoryService service;
	
	@GetMapping
	public ResponseEntity<List<CategoryDTO>> findAll(){
		List<CategoryDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
}
