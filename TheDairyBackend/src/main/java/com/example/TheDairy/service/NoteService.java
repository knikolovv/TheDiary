package com.example.TheDairy.service;


import com.example.TheDairy.model.Note;
import com.example.TheDairy.repository.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    @Autowired
    private NoteRepo noteRepo;

    public List<Note> getNotes() {
        return noteRepo.findAll();
    }

    public Note saveNote(Note note) {
        return noteRepo.save(note);
    }
}
