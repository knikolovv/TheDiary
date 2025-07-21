package com.example.TheDiary.service;

import com.example.TheDiary.model.Image;
import com.example.TheDiary.repository.ImageRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageService {
    private ImageRepo imageRepo;

    public Image getImageById(Long id) {
        return imageRepo.findById(id).orElseThrow(() -> new RuntimeException("Image not found with id: " + id));
    }

    public void deleteImageById(Long id) {
        if (!imageRepo.existsById(id)) {
            throw new RuntimeException("Image not found with id: " + id);
        }
        imageRepo.deleteById(id);
    }
}
