package com.supplychain.service;

import com.supplychain.model.Order;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(String id);
    Order saveOrder(Order order);
    Optional<Order> updateOrder(String id, Order orderDetails);
    void deleteOrder(String id);
}