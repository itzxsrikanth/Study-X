package com.tutor.aigateway.controller;

import com.tutor.aigateway.router.AiModelRouter;
import com.tutor.common.dto.ApiResponse;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/tutor")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiTutorController {

    private final AiModelRouter aiModelRouter;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TutorChatRequest {
        private String prompt;
        private String mode;
        private String sessionId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TutorChatResponse {
        private String response;
        private String providerUsed;
        private boolean isFallbackUsed;
    }

    @PostMapping("/chat")
    public ApiResponse<TutorChatResponse> chat(@RequestBody TutorChatRequest request) {
        String session = (request.getSessionId() != null && !request.getSessionId().isEmpty())
                ? request.getSessionId()
                : "default_session";

        AiModelRouter.RouterResult result = aiModelRouter.processQuery(session, request.getPrompt(), request.getMode());

        TutorChatResponse response = new TutorChatResponse(
                result.response,
                result.providerUsed,
                result.isFallbackUsed
        );

        return ApiResponse.success("AI Tutor response generated successfully", response);
    }
}
