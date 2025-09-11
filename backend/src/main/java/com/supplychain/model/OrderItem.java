package com.supplychain.model;

// এটি একটি সাধারণ ক্লাস, কোনো @Document টীকা লাগবে না
public class OrderItem {
    private String name;
    private int quantity;
    private double price;
    private String sku;

    // --- Getters and Setters ---
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
}