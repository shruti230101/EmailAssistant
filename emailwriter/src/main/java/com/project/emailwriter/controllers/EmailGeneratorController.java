package com.project.emailwriter.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.emailwriter.entities.EmailRequest;
import com.project.emailwriter.services.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate-email")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) throws JsonProcessingException {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
