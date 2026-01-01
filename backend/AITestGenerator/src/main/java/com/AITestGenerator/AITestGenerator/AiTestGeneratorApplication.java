package com.AITestGenerator.AITestGenerator;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "AI Test Generator API",
                version = "1.0.0",
                description = "REST APIs for AI-powered JUnit test case generation from Java source files",
                contact = @Contact(
                        name = "Tirth Bhanderi",
                        email = "bhanderitirth1311@gmail.com"
                )
        ),
        servers ={}
)
public class AiTestGeneratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiTestGeneratorApplication.class, args);
	}

}
