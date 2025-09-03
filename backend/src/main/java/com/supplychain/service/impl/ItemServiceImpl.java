package com.supplychain.service.impl;

import com.supplychain.model.Item;
import com.supplychain.repository.ItemRepository;
import com.supplychain.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of ItemService interface
 */
@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> getItemById(String id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item createItem(Item item) {
        // Set timestamps
        item.setCreatedAt(LocalDateTime.now());
        item.setUpdatedAt(LocalDateTime.now());
        
        // Check if item with same name and supplier already exists
        if (itemRepository.existsByNameAndSupplier(item.getName(), item.getSupplier())) {
            throw new IllegalArgumentException("Item with this name and supplier already exists");
        }
        
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(String id, Item itemDetails) {
        Optional<Item> existingItemOpt = itemRepository.findById(id);
        
        if (existingItemOpt.isPresent()) {
            Item existingItem = existingItemOpt.get();
            
            // Update fields
            existingItem.setName(itemDetails.getName());
            existingItem.setDescription(itemDetails.getDescription());
            existingItem.setQuantity(itemDetails.getQuantity());
            existingItem.setPrice(itemDetails.getPrice());
            existingItem.setSupplier(itemDetails.getSupplier());
            existingItem.setUpdatedAt(LocalDateTime.now());
            
            return itemRepository.save(existingItem);
        } else {
            throw new IllegalArgumentException("Item not found with id: " + id);
        }
    }

    @Override
    public void deleteItem(String id) {
        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("Item not found with id: " + id);
        }
        itemRepository.deleteById(id);
    }

    @Override
    public List<Item> findItemsByName(String name) {
        return itemRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Item> findItemsBySupplier(String supplier) {
        return itemRepository.findBySupplier(supplier);
    }

    @Override
    public List<Item> findLowStockItems() {
        return itemRepository.findLowStockItems();
    }

    @Override
    public List<Item> findItemsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return itemRepository.findByPriceBetween(minPrice, maxPrice);
    }

    @Override
    public Item updateItemQuantity(String id, Integer newQuantity) {
        Optional<Item> existingItemOpt = itemRepository.findById(id);
        
        if (existingItemOpt.isPresent()) {
            Item existingItem = existingItemOpt.get();
            existingItem.setQuantity(newQuantity);
            existingItem.setUpdatedAt(LocalDateTime.now());
            return itemRepository.save(existingItem);
        } else {
            throw new IllegalArgumentException("Item not found with id: " + id);
        }
    }

    @Override
    public boolean itemExists(String name, String supplier) {
        return itemRepository.existsByNameAndSupplier(name, supplier);
    }
}
