package com.example.menuservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.awt.*;

@SpringBootApplication
@EnableEurekaClient

@RequestMapping("/menu")
public class MenuServiceApplication {

	@RequestMapping("/{[restaurantId}")


	public MenuItem getMenuItem(@PathVariable("restaurantId") String restaurantId){
		return null;
	}
	public static void main(String[] args) {
		SpringApplication.run(MenuServiceApplication.class, args);
	}

}
