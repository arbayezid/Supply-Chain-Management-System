package com.supplychain.controller;

import com.supplychain.model.Item;
import com.supplychain.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Item operations
 */
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    /**
     * Get all items
     */
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Get item by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable String id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create new item
     */
    @PostMapping
    public ResponseEntity<Item> createItem(@Valid @RequestBody Item item) {
        try {
            Item createdItem = itemService.createItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update existing item
     */
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable String id, @Valid @RequestBody Item item) {
        try {
            Item updatedItem = itemService.updateItem(id, item);
            return ResponseEntity.ok(updatedItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete item by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Find items by name
     */
    @GetMapping("/search/name")
    public ResponseEntity<List<Item>> findItemsByName(@RequestParam String name) {
        List<Item> items = itemService.findItemsByName(name);
        return ResponseEntity.ok(items);
    }

    /**
     * Find items by supplier
     */
    @GetMapping("/search/supplier")
    public ResponseEntity<List<Item>> findItemsBySupplier(@RequestParam String supplier) {
        List<Item> items = itemService.findItemsBySupplier(supplier);
        return ResponseEntity.ok(items);
    }

    /**
     * Find items with low stock
     */
    @GetMapping("/low-stock")
    public ResponseEntity<List<Item>> findLowStockItems() {
        List<Item> items = itemService.findLowStockItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Find items by price range
     */
    @GetMapping("/search/price-range")
    public ResponseEntity<List<Item>> findItemsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        List<Item> items = itemService.findItemsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(items);
    }

    /**
     * Update item quantity
     */
    @PatchMapping("/{id}/quantity")
    public ResponseEntity<Item> updateItemQuantity(
            @PathVariable String id,
            @RequestParam Integer quantity) {
        try {
            Item updatedItem = itemService.updateItemQuantity(id, quantity);
            return ResponseEntity.ok(updatedItem);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Check if item exists
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkItemExists(
            @RequestParam String name,
            @RequestParam String supplier) {
        boolean exists = itemService.itemExists(name, supplier);
        return ResponseEntity.ok(exists);
    }
}
