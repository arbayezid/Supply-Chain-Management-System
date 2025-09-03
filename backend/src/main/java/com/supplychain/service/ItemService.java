package com.supplychain.service;

import com.supplychain.model.Item;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service interface for Item business logic
 */
public interface ItemService {

    /**
     * Get all items
     */
    List<Item> getAllItems();

    /**
     * Get item by ID
     */
    Optional<Item> getItemById(String id);

    /**
     * Create new item
     */
    Item createItem(Item item);

    /**
     * Update existing item
     */
    Item updateItem(String id, Item item);

    /**
     * Delete item by ID
     */
    void deleteItem(String id);

    /**
     * Find items by name (case-insensitive search)
     */
    List<Item> findItemsByName(String name);

    /**
     * Find items by supplier
     */
    List<Item> findItemsBySupplier(String supplier);

    /**
     * Find items with low stock (quantity < 10)
     */
    List<Item> findLowStockItems();

    /**
     * Find items by price range
     */
    List<Item> findItemsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * Update item quantity
     */
    Item updateItemQuantity(String id, Integer newQuantity);

    /**
     * Check if item exists by name and supplier
     */
    boolean itemExists(String name, String supplier);
}
