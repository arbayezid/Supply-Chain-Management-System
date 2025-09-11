package com.supplychain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "items")
public class Item {
    @Id
    private String id;
    private String name;
    private String sku;
    private String category;
    private int quantity;
    private int minQuantity;
    private double price;
    private String supplier;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // --- Getter & Setter for all fields ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getMinQuantity() { return minQuantity; }
    public void setMinQuantity(int minQuantity) { this.minQuantity = minQuantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
