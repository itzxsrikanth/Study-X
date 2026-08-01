package com.tutor.feedback.controller;

import com.tutor.common.dto.ApiResponse;
import com.tutor.feedback.dto.QuizResultResponse;
import com.tutor.feedback.dto.QuizSubmissionRequest;
import com.tutor.feedback.model.QuizQuestion;
import com.tutor.feedback.service.QuizEvaluationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizEvaluationService quizEvaluationService;

    @GetMapping("/generate")
    public ResponseEntity<ApiResponse<List<QuizQuestion>>> generateQuiz(@RequestParam(defaultValue = "General") String topic) {
        List<QuizQuestion> questions = quizEvaluationService.generateQuizQuestions(topic);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(@Valid @RequestBody QuizSubmissionRequest request) {
        QuizResultResponse response = quizEvaluationService.evaluateSubmission(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Quiz evaluation complete"));
    }
}
