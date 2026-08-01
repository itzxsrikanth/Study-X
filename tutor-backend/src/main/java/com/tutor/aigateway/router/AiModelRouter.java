package com.tutor.aigateway.router;

import com.tutor.aigateway.provider.AiModelProvider;
import com.tutor.aigateway.provider.AnthropicClaudeProvider;
import com.tutor.aigateway.provider.GoogleGeminiProvider;
import com.tutor.aigateway.service.ConversationMemoryService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiModelRouter {

    private final AnthropicClaudeProvider claudeProvider;
    private final GoogleGeminiProvider geminiProvider;
    private final ConversationMemoryService memoryService;

    public static class RouterResult {
        public final String response;
        public final String providerUsed;
        public final boolean isFallbackUsed;

        public RouterResult(String response, String providerUsed, boolean isFallbackUsed) {
            this.response = response;
            this.providerUsed = providerUsed;
            this.isFallbackUsed = isFallbackUsed;
        }
    }

    public RouterResult processQuery(String sessionId, String userPrompt, String requestedMode) {
        memoryService.appendUserMessage(sessionId, userPrompt);
        String conversationHistory = memoryService.getFormattedHistory(sessionId);

        AiModelProvider primaryProvider = determinePrimaryProvider(userPrompt, requestedMode);
        AiModelProvider fallbackProvider = (primaryProvider == claudeProvider) ? geminiProvider : claudeProvider;

        log.info("[AI Router] Routing query to primary provider: [{}]", primaryProvider.getProviderName());

        String response = null;
        boolean fallbackTriggered = false;

        try {
            response = primaryProvider.generateResponse(userPrompt, conversationHistory);
        } catch (Exception e) {
            log.warn("[AI Router] Primary provider [{}] failed: {}. Executing failover to [{}]",
                    primaryProvider.getProviderName(), e.getMessage(), fallbackProvider.getProviderName());
        }

        if (response == null || response.trim().isEmpty()) {
            log.warn("[AI Router] Executing failover to secondary provider [{}]", fallbackProvider.getProviderName());
            fallbackTriggered = true;
            try {
                response = fallbackProvider.generateResponse(userPrompt, conversationHistory);
            } catch (Exception e) {
                log.error("[AI Router] Secondary provider [{}] also failed: {}", fallbackProvider.getProviderName(), e.getMessage());
            }
        }

        String finalProviderName = fallbackTriggered ? fallbackProvider.getProviderName() : primaryProvider.getProviderName();
        memoryService.appendAiMessage(sessionId, finalProviderName, response);

        return new RouterResult(response, finalProviderName, fallbackTriggered);
    }

    private AiModelProvider determinePrimaryProvider(String prompt, String mode) {
        if (mode != null) {
            String lowerMode = mode.toLowerCase();
            if (lowerMode.equals("coding") || lowerMode.equals("debug") || lowerMode.equals("study")) {
                return claudeProvider;
            }
            if (lowerMode.equals("research") || lowerMode.equals("productivity") || lowerMode.equals("writing")) {
                return geminiProvider;
            }
        }

        String lowerPrompt = prompt.toLowerCase();
        if (lowerPrompt.contains("code") || lowerPrompt.contains("java") || lowerPrompt.contains("react") ||
            lowerPrompt.contains("debug") || lowerPrompt.contains("explain") || lowerPrompt.contains("architecture") ||
            lowerPrompt.contains("solve") || lowerPrompt.contains("why")) {
            return claudeProvider;
        }

        return geminiProvider;
    }
}
