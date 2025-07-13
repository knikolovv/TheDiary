package com.example.TheDairy.service;

import com.example.TheDairy.repository.ImageRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ImageService {
    ImageRepo imageRepo;

    public void deleteImageById(Long id) {
        if (!imageRepo.existsById(id)) {
            throw new RuntimeException("Image not found with id: " + id);
        }
        imageRepo.deleteById(id);
    }
}
