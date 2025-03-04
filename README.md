## Email Reply Generator
- This Email Reply Generator application is a web-based tool that automatically generates email replies based on the provided email content and an optional tone selection. 
- The application leverages React.js on the frontend and Spring Boot with Gemini API on the backend to generate AI-powered email replies.

# Key Features
- Automatic email reply generation
- Select different tones: Professional, Casual, or Friendly
- Real-time API integration with Gemini AI
- Copy generated reply to clipboard
- Error handling with user-friendly messages
- Loading indicator during API requests
- Clean and modular component-based architecture

## Tech Stack
1. Frontend: React.js, Material UI (MUI), Axios, React Hooks
2. Backend: Spring Boot, Gemini API, REST APIs
3. Clean Code Principles

## How It Works
Enter the email content and choose the tone from the dropdown. Then click the Generate Reply button.
The app sends a request to the backend API. The backend generates the reply using the Gemini AI API.
The reply is displayed, and you can copy it to the clipboard.

##How to Run the App
- Prerequisites: Node.js installed
- Clone the repository
- Backend API running on http://localhost:8080
- Add the Google Gemini API URL and Gemini API KEY as environment variables.
- Install dependencies: npm install
- Start the app: npm run dev

## API Documentation
- Endpoint: POST /api/email/generate-email
- Request Body
  {
    "emailContent": "string",
    "tone": "string (optional)"
  }

- Response
  {
    "generatedReply": "string"
  }
