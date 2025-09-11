package com.supplychain.repository;

import com.supplychain.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

/**
 * Repository interface for Item entity operations
 */
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByQuantityLessThan(int threshold); // Low stock
    List<Item> findByQuantity(int quantity); // Out of stock
}
