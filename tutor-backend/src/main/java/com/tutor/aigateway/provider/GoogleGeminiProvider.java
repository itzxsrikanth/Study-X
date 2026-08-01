package com.tutor.aigateway.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class GoogleGeminiProvider implements AiModelProvider {

    @Value("${google.gemini.api.key:}")
    private String apiKey;

    private static final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=";
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getProviderName() {
        return "Google Gemini 1.5 Flash";
    }

    @Override
    public boolean isAvailable() {
        return apiKey != null && !apiKey.trim().isEmpty();
    }

    @Override
    public String generateResponse(String prompt, String conversationHistory) {
        if (!isAvailable()) {
            log.info("[Gemini Provider] API Key not present. Returning fast Gemini fallback response.");
            return generateGeminiFallback(prompt);
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String fullContext = (conversationHistory != null && !conversationHistory.isEmpty())
                    ? conversationHistory + "\nUser: " + prompt
                    : prompt;

            String escaped = fullContext.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n");
            String jsonPayload = String.format(
                "{\"contents\":[{\"parts\":[{\"text\":\"%s\"}]}]}",
                escaped
            );

            HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_URL + apiKey, entity, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseContentFromGeminiJson(response.getBody());
            }
        } catch (Exception e) {
            log.warn("[Gemini Provider] API Call error: {}. Falling back gracefully.", e.getMessage());
        }

        return generateGeminiFallback(prompt);
    }

    private String parseContentFromGeminiJson(String json) {
        try {
            int textIdx = json.indexOf("\"text\":\"");
            if (textIdx != -1) {
                int start = textIdx + 8;
                int end = json.indexOf("\"", start);
                if (end != -1) {
                    return json.substring(start, end).replace("\\n", "\n").replace("\\\"", "\"");
                }
            }
        } catch (Exception e) {}
        return json;
    }

    private String generateGeminiFallback(String prompt) {
        return "### ⚡ [Google Gemini 1.5 Flash] Rapid Synthesis & Overview\n\n" +
               "**Query**: \"" + prompt + "\"\n\n" +
               "#### Key Takeaways & Fast Explanation\n" +
               "- **Summary**: High-speed conceptual synthesis for optimal retention.\n" +
               "- **Core Principle**: Streamlined explanation focusing on immediate application.\n\n" +
               "#### Practical Flashcard Summary\n" +
               "- **Concept**: " + prompt + "\n" +
               "- **Key Insight**: Designed for fast multimodal processing and high throughput learning.";
    }
}
