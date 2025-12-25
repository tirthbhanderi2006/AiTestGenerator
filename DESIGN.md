# JUnit Test Generator - System Design

## Database Design (MongoDB)

### 1. User Collection
```javascript
{
  _id: ObjectId("..."),
  username: String,        // Unique username
  email: String,          // Unique email
  password: String,       // Hashed password
  fullName: String,
  avatar: String,         // URL to avatar image
  role: String,           // 'USER' or 'ADMIN'
  isVerified: Boolean,    // Email verification status
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Chat Session Collection
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("user_id"),
  title: String,          // Auto-generated or user-defined title
  description: String,    // Optional description
  isPinned: Boolean,
  tags: [String],         // For categorization
  createdAt: Date,
  updatedAt: Date
}
```

### 3. Message Collection
```javascript
{
  _id: ObjectId("..."),
  sessionId: ObjectId("chat_session_id"),
  sender: String,         // 'USER' or 'AI'
  content: String,        // Message content
  type: String,           // 'TEXT', 'CODE', 'FILE_UPLOAD'
  metadata: {
    language: String,     // For code blocks
    fileName: String,     // For file uploads
    fileSize: Number,     // In bytes
    fileType: String      // MIME type
  },
  timestamp: Date
}
```

### 4. Test Generation Collection
```javascript
{
  _id: ObjectId("..."),
  sessionId: ObjectId("chat_session_id"),
  originalFile: {
    name: String,
    content: String,      // Original file content
    path: String,         // Path to stored file if using gridfs
    size: Number,
    type: String          // MIME type
  },
  generatedTests: [{
    className: String,    // Original class name + "Test"
    content: String,      // Generated test content
    status: String,      // 'GENERATED', 'EDITED', 'RUN', 'FAILED', 'PASSED'
    executionResults: [{
      timestamp: Date,
      status: String,    // 'PASS', 'FAIL', 'ERROR'
      output: String,    // Console output
      duration: Number   // Execution time in ms
    }],
    lastEdited: Date
  }],
  dependencies: [String], // Required dependencies (JUnit, Mockito versions)
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Test Template Collection
```javascript
{
  _id: ObjectId("..."),
  name: String,           // Template name
  description: String,
  content: String,        // Template content with placeholders
  type: String,           // 'UNIT_TEST', 'INTEGRATION_TEST', etc.
  language: String,       // 'JAVA', 'KOTLIN', etc.
  framework: String,      // 'JUNIT5', 'TESTNG', etc.
  isDefault: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
src/
├── main/
│   ├── java/com/junittestgenerator/
│   │   ├── config/                    # Configuration classes
│   │   │   ├── SecurityConfig.java
│   │   │   ├── WebConfig.java
│   │   │   └── MongoConfig.java
│   │   │
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── ChatController.java
│   │   │   ├── TestGenerationController.java
│   │   │   └── UserController.java
│   │   │
│   │   ├── model/                     # Document models
│   │   │   ├── User.java
│   │   │   ├── ChatSession.java
│   │   │   ├── Message.java
│   │   │   └── TestGeneration.java
│   │   │
│   │   ├── repository/                # MongoDB repositories
│   │   │   ├── UserRepository.java
│   │   │   ├── ChatSessionRepository.java
│   │   │   ├── MessageRepository.java
│   │   │   └── TestGenerationRepository.java
│   │   │
│   │   ├── service/                   # Business logic
│   │   │   ├── AuthService.java
│   │   │   ├── ChatService.java
│   │   │   ├── TestGenerationService.java
│   │   │   └── UserService.java
│   │   │
│   │   ├── util/                      # Utility classes
│   │   │   ├── CodeAnalyzer.java
│   │   │   ├── TestGenerator.java
│   │   │   └── TemplateEngine.java
│   │   │
│   │   ├── exception/                 # Custom exceptions
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── CustomExceptionHandler.java
│   │   │
│   │   └── JUnitTestGeneratorApplication.java
│   │
│   └── resources/
│       ├── application.properties     # Configuration
│       ├── static/                    # Frontend build
│       └── templates/                 # Email templates
│
└── test/                              # Test files
    └── java/com/junittestgenerator/
        ├── controller/
        ├── service/
        └── util/
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/signout` - User logout

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users/me/sessions` - Get user's chat sessions

### Chat Sessions
- `GET /api/sessions` - List all chat sessions
- `POST /api/sessions` - Create new chat session
- `GET /api/sessions/{id}` - Get chat session by ID
- `PUT /api/sessions/{id}` - Update chat session
- `DELETE /api/sessions/{id}` - Delete chat session

### Messages
- `GET /api/sessions/{sessionId}/messages` - Get messages in a session
- `POST /api/sessions/{sessionId}/messages` - Send new message
- `DELETE /api/messages/{id}` - Delete a message

### Test Generation
- `POST /api/generate` - Generate tests from code
- `POST /api/generate/analyze` - Analyze code without generating tests
- `POST /api/generate/execute` - Execute generated tests
- `GET /api/templates` - List available test templates

## Key Features Implementation

### 1. Code Analysis
- Parse Java source code to extract class structure, methods, and dependencies
- Identify testable units and suggest test cases
- Detect potential edge cases and boundary conditions

### 2. Test Generation
- Use templates for different test scenarios
- Support for different testing frameworks (JUnit 5, Mockito)
- Generate meaningful test method names and assertions

### 3. Test Execution
- Compile and run generated tests
- Capture and display test results
- Support for different Java versions and build tools

### 4. Chat Interface
- Real-time messaging with the AI assistant
- Code highlighting and formatting
- File upload and preview

## Security Considerations
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting for API endpoints
- Secure password storage with bcrypt

## Deployment
- Containerized with Docker
- CI/CD pipeline with GitHub Actions
- Monitoring with Spring Boot Actuator
- Logging with ELK Stack

## Future Enhancements
1. Support for multiple programming languages
2. Integration with version control (Git)
3. Team collaboration features
4. Advanced test case customization
5. Performance benchmarking
6. AI-powered test case suggestions
7. Integration with CI/CD pipelines
