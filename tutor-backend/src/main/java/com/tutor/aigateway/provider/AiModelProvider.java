package com.tutor.aigateway.provider;

public interface AiModelProvider {
    String getProviderName();
    boolean isAvailable();
    String generateResponse(String prompt, String conversationHistory);
}
