package com.rlbpc.catalogo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.rlbpc.catalogo.services.S3Service;

@SpringBootApplication
public class CatalogoApplication implements CommandLineRunner{

	@Autowired
	private S3Service s3Service;
	
	public static void main(String[] args) {
		SpringApplication.run(CatalogoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		s3Service.uploadFile("F:\\Google Drive\\RODOLFO BORTOLUZZI\\ESTUDOS\\GRADUAÇÕES\\ENGENHARIA DE SOFTWARE\\CURSO BOOTCAMP DEVSUPERIOR\\teste upload.jpg");
		
	}

}
