CREATE TABLE quiz_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_id BIGINT,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage DOUBLE PRECISION,
    performance_rating VARCHAR(50),
    weak_topic VARCHAR(1000),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
