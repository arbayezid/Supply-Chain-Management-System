package com.supplychain.events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class InventoryEventPublisher {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void publishUpdate() {
        messagingTemplate.convertAndSend("/topic/inventory", "update");
    }
}