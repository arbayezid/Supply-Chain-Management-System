package com.supplychain.service.impl;

import com.supplychain.model.Item;
import com.supplychain.repository.ItemRepository;
import com.supplychain.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Implementation of ItemService interface
 */
@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> getItemById(String id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public void deleteItem(String id) {
        itemRepository.deleteById(id);
    }

    @Override
    public List<Item> getLowStockItems(int threshold) {
        // পরিবর্তিত মেথডটি এখানে কল করা হচ্ছে
        return itemRepository.findByQuantityLessThanEqual(threshold);
    }

    @Override
    public List<Item> getOutOfStockItems() {
        return itemRepository.findByQuantity(0);
    }
}