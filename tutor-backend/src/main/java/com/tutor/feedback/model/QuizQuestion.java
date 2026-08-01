package com.tutor.feedback.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestion {
    private String id;
    private String questionText;
    private List<String> options;
    private Integer correctOptionIndex;
    private String explanation;
    private String targetTopic;
}
