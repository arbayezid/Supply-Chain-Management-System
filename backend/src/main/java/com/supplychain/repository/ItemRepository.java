package com.supplychain.repository;

import com.supplychain.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

/**
 * Repository interface for Item entity operations
 */
public interface ItemRepository extends MongoRepository<Item, String> {

    /**
     * Finds items where the quantity is less than or equal to the given threshold.
     * This is used for finding low stock items.
     * @param threshold The stock quantity threshold.
     * @return A list of items at or below the stock threshold.
     */
    List<Item> findByQuantityLessThanEqual(int threshold);

    /**
     * Finds items with an exact quantity.
     * This is used for finding out-of-stock items (quantity = 0).
     * @param quantity The exact stock quantity to find.
     * @return A list of items with the specified stock quantity.
     */
    List<Item> findByQuantity(int quantity);
}