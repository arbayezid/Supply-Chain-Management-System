package com.supplychain.service.impl;

import com.supplychain.model.Order;
import com.supplychain.repository.OrderRepository;
import com.supplychain.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Override
    public Order saveOrder(Order order) {
        // নতুন অর্ডার তৈরির সময় orderDate সেট করা হচ্ছে
        if (order.getOrderDate() == null) {
            order.setOrderDate(LocalDate.now());
        }
        return orderRepository.save(order);
    }
    
    @Override
    public Optional<Order> updateOrder(String id, Order orderDetails) {
        return orderRepository.findById(id).map(existingOrder -> {
            existingOrder.setCustomerName(orderDetails.getCustomerName());
            existingOrder.setCustomerEmail(orderDetails.getCustomerEmail());
            existingOrder.setCustomerPhone(orderDetails.getCustomerPhone());
            existingOrder.setItems(orderDetails.getItems());
            existingOrder.setTotalAmount(orderDetails.getTotalAmount());
            existingOrder.setStatus(orderDetails.getStatus());
            existingOrder.setExpectedDelivery(orderDetails.getExpectedDelivery());
            existingOrder.setShippingAddress(orderDetails.getShippingAddress());
            existingOrder.setPaymentMethod(orderDetails.getPaymentMethod());
            existingOrder.setPaymentStatus(orderDetails.getPaymentStatus());
            existingOrder.setNotes(orderDetails.getNotes());
            return orderRepository.save(existingOrder);
        });
    }

    @Override
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}