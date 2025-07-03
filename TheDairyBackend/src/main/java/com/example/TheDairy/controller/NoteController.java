package com.example.TheDairy.controller;

import com.example.TheDairy.model.Note;
import com.example.TheDairy.service.NoteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/note")
@AllArgsConstructor
public class NoteController {
    private NoteService noteService;

    @GetMapping("")
    public ResponseEntity<List<Note>> getNotes() {
        List<Note> notes = noteService.getNotes();
        return ResponseEntity.ok(notes);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Note> createNote(@Valid @RequestParam String title,
                                           @Valid @RequestParam String description,
                                           @RequestParam(required = false) MultipartFile[] images) throws IOException {
        Note newNote = noteService.saveNote(title, description, images);

        return new ResponseEntity<>(newNote, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
