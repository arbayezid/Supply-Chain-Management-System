package com.supplychain.controller;

import com.supplychain.model.Item;
import com.supplychain.service.ItemService;
import com.supplychain.events.InventoryEventPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {
    @Autowired private ItemService itemService;
    @Autowired private InventoryEventPublisher eventPublisher;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable String id) {
        return itemService.getItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/low-stock")
    public List<Item> getLowStockItems(@RequestParam(defaultValue = "10") int threshold) {
        return itemService.getLowStockItems(threshold);
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        // নতুন আইটেম তৈরির সময় createdAt এবং updatedAt সেট করা হচ্ছে
        LocalDateTime now = LocalDateTime.now();
        item.setCreatedAt(now);
        item.setUpdatedAt(now);
        Item savedItem = itemService.saveItem(item);
        eventPublisher.publishUpdate();
        return savedItem;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable String id, @RequestBody Item itemDetails) {
        return itemService.getItemById(id).map(existingItem -> {
            existingItem.setName(itemDetails.getName());
            existingItem.setSku(itemDetails.getSku());
            existingItem.setCategory(itemDetails.getCategory());
            existingItem.setQuantity(itemDetails.getQuantity());
            // --- পরিবর্তন এখানে ---
            // بما أن minQuantity একটি int, তাই null চেক করার প্রয়োজন নেই
            existingItem.setMinQuantity(itemDetails.getMinQuantity());
            existingItem.setPrice(itemDetails.getPrice());
            existingItem.setSupplier(itemDetails.getSupplier());
            existingItem.setLocation(itemDetails.getLocation());
            existingItem.setUpdatedAt(LocalDateTime.now());
            
            Item updatedItem = itemService.saveItem(existingItem);
            eventPublisher.publishUpdate();
            return ResponseEntity.ok(updatedItem);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        eventPublisher.publishUpdate();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stock-overview")
    public Map<String, Object> getStockOverview() {
        List<Item> items = itemService.getAllItems();
        Map<String, Object> overview = new HashMap<>();
        overview.put("totalProducts", items.size());
        
        // --- পরিবর্তন এখানে ---
        // بما أن price এবং quantity primitive, তাই null চেক করার প্রয়োজন নেই
        double totalValue = items.stream()
            .mapToDouble(i -> i.getPrice() * i.getQuantity())
            .sum();
        overview.put("totalStockValue", totalValue);
        
        // --- পরিবর্তন এখানে ---
        // بما أن quantity এবং minQuantity primitive, তাই null চেক করার প্রয়োজন নেই
        long lowStockCount = items.stream()
            .filter(i -> i.getQuantity() <= i.getMinQuantity() && i.getQuantity() > 0)
            .count();
        overview.put("lowStockCount", lowStockCount);

        List<Item> sortedItems = items.stream()
            .filter(i -> i.getUpdatedAt() != null)
            .sorted(Comparator.comparing(Item::getUpdatedAt).reversed())
            .collect(Collectors.toList());
        overview.put("recentStock", sortedItems.stream().limit(5).collect(Collectors.toList()));
        return overview;
    }
}