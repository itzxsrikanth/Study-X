package com.tutor.feedback.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceSignal {
    private Long userId;
    private Long planId;
    private Double accuracyPercentage;
    private String identifiedWeakness;
    private Boolean requiresPlanAdaptation;
}
