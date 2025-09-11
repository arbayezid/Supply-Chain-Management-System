package com.supplychain.repository;

import com.supplychain.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {

    /**
     * Counts the number of orders with a specific status.
     * @param status The status to count (e.g., "pending", "processing").
     * @return The number of orders with the given status.
     */
    long countByStatus(String status);

    /**
     * Counts the number of orders with a specific payment status.
     * @param paymentStatus The payment status to count (e.g., "paid", "pending").
     * @return The number of orders with the given payment status.
     */
    long countByPaymentStatus(String paymentStatus);
}