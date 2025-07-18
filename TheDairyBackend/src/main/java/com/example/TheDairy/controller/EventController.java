package com.example.TheDairy.controller;

import com.example.TheDairy.model.Event;
import com.example.TheDairy.service.EventService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/calendar/event")
public class EventController {
    private EventService eventService;

    @GetMapping("")
    public ResponseEntity<List<Event>> findAllEvents() {
        return ResponseEntity.ok(eventService.findAllEvents());
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event newEvent = eventService.createEvents(event);
        return ResponseEntity.ok(newEvent);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event updatedEvent = eventService.updateEvent(id, event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable Long id) {
        eventService.deleteEventById(id);
        return ResponseEntity.ok().build();
    }
}
