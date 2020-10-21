package com.rlbpc.catalogo.dto;

import java.io.Serializable;

import com.rlbpc.catalogo.entities.Category;

public class CategoryDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	
	public CategoryDTO() {
		
	}

	public CategoryDTO(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	//construtor que recebe a entidade
	public CategoryDTO(Category entity) {
		super();
		this.id = entity.getId();
		this.name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
