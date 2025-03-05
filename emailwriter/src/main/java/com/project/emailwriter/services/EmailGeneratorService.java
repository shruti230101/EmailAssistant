package com.project.emailwriter.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.emailwriter.entities.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient webClient) {
        this.webClient = webClient;
    }

    public String generateEmailReply(EmailRequest emailRequest) throws JsonProcessingException {
        String prompt = createPrompt(emailRequest);
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                });
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) throws JsonProcessingException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }
        catch (Exception e) {
            return "Error in processing the request: " + e.getMessage();
        }
    }

    private String createPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate an email reply for the provided email. Do not generate a subject line.");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty())
            prompt.append("Use the following tone for the mail: ").append(emailRequest.getTone());
        prompt.append("\nEnsure the response is formatted as a proper email with a greeting, body, and closing.");
        prompt.append("\nIf the response does not contain a greeting, add one such as 'Dear [Recipient],' or 'Hi [Recipient],'.");
        prompt.append("\nIf the response does not contain a closing, add one such as 'Best regards,' followed by '")
                .append(emailRequest.getSenderName())
                .append("'.");
        prompt.append("\n Original email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
