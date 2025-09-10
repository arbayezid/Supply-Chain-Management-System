package com.supplychain.repository;

import com.supplychain.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    long countByStatus(String status);
    long countByPaymentStatus(String paymentStatus);
}