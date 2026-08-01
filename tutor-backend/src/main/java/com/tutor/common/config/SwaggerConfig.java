package com.tutor.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AI Tutor API")
                        .version("1.0.0")
                        .description("REST API documentation for AI Tutor Application across 5 Learning Phases")
                        .contact(new Contact().name("AI Tutor Team")));
    }
}
