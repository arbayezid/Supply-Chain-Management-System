package com.supplychain.controller;

import com.supplychain.repository.OrderRepository;
import com.supplychain.model.Order;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin
public class DashboardController {
    private final OrderRepository orderRepository;

    public DashboardController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        List<Order> allOrders = orderRepository.findAll();

        double totalRevenue = allOrders.stream().mapToDouble(Order::getTotalAmount).sum();

        summary.put("totalOrders", allOrders.size());
        summary.put("totalRevenue", totalRevenue);
        summary.put("pendingOrders", orderRepository.countByStatus("pending"));
        summary.put("processingOrders", orderRepository.countByStatus("processing"));
        summary.put("shippedOrders", orderRepository.countByStatus("shipped"));
        summary.put("deliveredOrders", orderRepository.countByStatus("delivered"));
        summary.put("paidOrders", orderRepository.countByPaymentStatus("paid"));
        summary.put("unpaidOrders", orderRepository.countByPaymentStatus("pending"));

        return summary;
    }
}