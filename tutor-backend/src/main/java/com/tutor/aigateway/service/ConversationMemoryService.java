package com.tutor.aigateway.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ConversationMemoryService {

    private final Map<String, List<String>> sessionHistory = new ConcurrentHashMap<>();

    public void appendUserMessage(String sessionId, String message) {
        sessionHistory.computeIfAbsent(sessionId, k -> new ArrayList<>()).add("User: " + message);
        trimHistory(sessionId);
    }

    public void appendAiMessage(String sessionId, String providerName, String response) {
        sessionHistory.computeIfAbsent(sessionId, k -> new ArrayList<>()).add("[" + providerName + "]: " + response);
        trimHistory(sessionId);
    }

    public String getFormattedHistory(String sessionId) {
        List<String> history = sessionHistory.get(sessionId);
        if (history == null || history.isEmpty()) return "";
        return String.join("\n", history);
    }

    public void clearHistory(String sessionId) {
        sessionHistory.remove(sessionId);
    }

    private void trimHistory(String sessionId) {
        List<String> history = sessionHistory.get(sessionId);
        if (history != null && history.size() > 20) {
            sessionHistory.put(sessionId, new ArrayList<>(history.subList(history.size() - 20, history.size())));
        }
    }
}
