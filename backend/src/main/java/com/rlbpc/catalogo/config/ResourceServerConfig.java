package com.rlbpc.catalogo.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer //implementa o Resource Server do OAuth2
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{

	@Autowired
	private Environment env;
	
	@Autowired
	private JwtTokenStore tokenStore;
	
	//Definição dos endpoints públicos
	private static final String[] PUBLIC = {"/oauth/token","/h2-console/**"};
	
	//Definição dos endpoints operator e admin
	private static final String[] OPERATOR_OR_ADMIN = {"/products/**","/categories/**"};
	
	//Definição dos endpoints exclusivos do admin
	private static final String[] ADMIN = {"/users/**"};
	
	
	
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenStore(tokenStore);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		
		 //libera o acesso do banco de dados local h2 para fins de teste
		if (Arrays.asList(env.getActiveProfiles()).contains("test")){
			http.headers().frameOptions().disable();
		}
		
		//controla as autorizações conforme o perfil
		http.authorizeRequests()
		.antMatchers(PUBLIC).permitAll()
		.antMatchers(HttpMethod.GET, OPERATOR_OR_ADMIN).permitAll()
		.antMatchers(OPERATOR_OR_ADMIN).hasAnyRole("OPERATOR", "ADMIN")
		.antMatchers(ADMIN).hasRole("ADMIN")
		.anyRequest().authenticated();
		
	}

	
	
}
