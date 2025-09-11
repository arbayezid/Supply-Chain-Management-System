package com.supplychain.service;

import com.supplychain.model.Item;
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

     * Create or update item
     */
    Item saveItem(Item item);

    /**
     * Delete item by ID
     */
    void deleteItem(String id);

    /**
     * Get low stock items based on a threshold
     */
    List<Item> getLowStockItems(int threshold);

    /**
     * Get out of stock items
     */
    List<Item> getOutOfStockItems();
}