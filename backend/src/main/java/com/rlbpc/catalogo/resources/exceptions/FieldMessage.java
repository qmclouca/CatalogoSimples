package com.rlbpc.catalogo.resources.exceptions;

import java.io.Serializable;

public class FieldMessage implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String fieldName;
	private String message;

	public FieldMessage() {
		
	}

	public FieldMessage(String FieldName, String message) {
		super();
		this.fieldName = FieldName;
		this.message = message;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String FieldName) {
		this.fieldName = FieldName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
