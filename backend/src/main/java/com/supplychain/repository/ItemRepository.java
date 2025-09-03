package com.supplychain.repository;

import com.supplychain.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Item entity operations
 */
@Repository
public interface ItemRepository extends MongoRepository<Item, String> {

    /**
     * Find items by name (case-insensitive)
     */
    List<Item> findByNameContainingIgnoreCase(String name);

    /**
     * Find items by supplier
     */
    List<Item> findBySupplier(String supplier);

    /**
     * Find items with quantity less than specified value
     */
    List<Item> findByQuantityLessThan(Integer quantity);

    /**
     * Find items with price between specified range
     */
    List<Item> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * Find items by supplier and quantity greater than specified value
     */
    List<Item> findBySupplierAndQuantityGreaterThan(String supplier, Integer quantity);

    /**
     * Custom query to find items with low stock (quantity < 10)
     */
    @Query("{'quantity': {$lt: 10}}")
    List<Item> findLowStockItems();

    /**
     * Custom query to find items by price range and supplier
     */
    @Query("{'price': {$gte: ?0, $lte: ?1}, 'supplier': ?2}")
    List<Item> findByPriceRangeAndSupplier(BigDecimal minPrice, BigDecimal maxPrice, String supplier);

    /**
     * Check if item exists by name and supplier
     */
    boolean existsByNameAndSupplier(String name, String supplier);

    /**
     * Find item by name and supplier
     */
    Optional<Item> findByNameAndSupplier(String name, String supplier);
}
