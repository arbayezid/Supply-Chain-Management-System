package com.supplychain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application class for Supply Chain Management System
 */
@SpringBootApplication
public class SupplyChainApplication {

    public static void main(String[] args) {
        SpringApplication.run(SupplyChainApplication.class, args);
        System.out.println("Supply Chain Management System Backend Started Successfully!");
        System.out.println("Application is running on: http://localhost:8080");
        System.out.println("API Documentation: http://localhost:8080/api/hello");
    }
}
