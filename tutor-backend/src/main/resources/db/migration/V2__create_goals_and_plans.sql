CREATE TABLE learner_goals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    raw_goal_prompt VARCHAR(1000) NOT NULL,
    primary_subject VARCHAR(255),
    target_skill_level VARCHAR(50),
    weekly_hours_commitment INT,
    preferred_learning_style VARCHAR(100),
    estimated_duration_weeks INT,
    status VARCHAR(50) DEFAULT 'PARSED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    goal_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    total_milestones INT DEFAULT 0,
    completed_milestones INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_id BIGINT NOT NULL,
    sequence_order INT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    estimated_hours INT,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (plan_id) REFERENCES learning_plans(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    milestone_id BIGINT NOT NULL,
    sequence_order INT,
    title VARCHAR(255) NOT NULL,
    resource_url VARCHAR(1000),
    duration_minutes INT,
    status VARCHAR(50) DEFAULT 'PENDING',
    FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE CASCADE
);
