package com.example.TheDairy.service;


import com.example.TheDairy.model.Image;
import com.example.TheDairy.model.Note;
import com.example.TheDairy.repository.ImageRepository;
import com.example.TheDairy.repository.NoteRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@Transactional
public class NoteService {
    @Autowired
    private NoteRepo noteRepo;
    @Autowired
    private ImageRepository imageRepository;

    private final Path root = Paths.get("uploads/notes/images");

    public List<Note> findAllNotes() {
        return noteRepo.findAll();
    }

    public Note saveNote(String title, String description, MultipartFile[] images) throws IOException {
        Note note = new Note();
        note.setTitle(title);
        note.setDescription(description);
        noteRepo.save(note);

        if(images != null && images.length > 0) {
            Files.createDirectories(root);

            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                    Path filePath = root.resolve(fileName);
                    Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    Image img = new com.example.TheDairy.model.Image();
                    img.setNote(note);
                    img.setFileName(fileName);
                    img.setPath(filePath.toString());
                    imageRepository.save(img);

                    note.getImages().add(img);
                }
            }
        }

        return note;
    }

    public void deleteNote(Long id) {
        if (noteRepo.existsById(id)) {
            noteRepo.deleteById(id);
        } else {
            throw new RuntimeException("Note not found with id: " + id);
        }
    }

    public Note getNoteById(Long id) {
        return noteRepo.findById(id).orElse(null);
    }
}
