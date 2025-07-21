package com.example.TheDiary.controller;

import com.example.TheDiary.model.Event;
import com.example.TheDiary.service.EventService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
        List<Event> events = eventService.findAllEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping("/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event newEvent = eventService.createEvents(event);
        return ResponseEntity.ok(newEvent);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id,@Valid @RequestBody Event event) {
        Event updatedEvent = eventService.updateEvent(id, event);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable Long id) {
        if (eventService.getEventById(id) == null) {
            return ResponseEntity.notFound().build();
        } else {
            eventService.deleteEventById(id);
            return ResponseEntity.ok().build();
        }
    }
}
