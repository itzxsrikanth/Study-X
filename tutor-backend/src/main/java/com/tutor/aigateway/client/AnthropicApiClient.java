package com.tutor.aigateway.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnthropicApiClient {

    private final WebClient aiWebClient;

    @Value("${ai.api.key:}")
    private String apiKey;

    public String generateCompletion(String systemPrompt, String userPrompt) {
        if (apiKey == null || apiKey.isBlank() || apiKey.startsWith("mock-")) {
            log.info("No valid AI API Key found; using local intelligent orchestration engine.");
            return null; // Fallback signal for PromptOrchestrationService
        }

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "claude-3-5-sonnet-20241022",
                    "max_tokens", 2048,
                    "system", systemPrompt,
                    "messages", List.of(Map.of("role", "user", "content", userPrompt))
            );

            Map response = aiWebClient.post()
                    .uri("/v1/messages")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("content")) {
                List<Map<String, Object>> content = (List<Map<String, Object>>) response.get("content");
                if (!content.isEmpty()) {
                    return (String) content.get(0).get("text");
                }
            }
        } catch (Exception e) {
            log.warn("AI Gateway HTTP call failed: {}. Falling back to dynamic rule engine.", e.getMessage());
        }

        return null;
    }
}
