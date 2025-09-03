package com.supplychain.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Simple Hello Controller for health check and testing
 */
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public Map<String, Object> hello() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Hello from Supply Chain Management System!");
        response.put("timestamp", LocalDateTime.now());
        response.put("status", "UP");
        response.put("service", "Supply Chain Management Backend");
        response.put("version", "1.0.0");
        
        return response;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now());
        response.put("service", "Supply Chain Management Backend");
        response.put("database", "MongoDB");
        response.put("version", "1.0.0");
        
        return response;
    }
}
