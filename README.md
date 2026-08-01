# StudyX - Adaptive Learning System 🧠

Welcome to **StudyX**, a next-generation AI-powered educational platform designed to build personalized learning roadmaps, teach complex subjects, and track your progress through adaptive analytics.

## 🚀 Features

- **AI Goal Intake:** Natural language processing to convert your learning goals into a concrete curriculum.
- **Dynamic Roadmaps:** Interactive, node-based learning timelines that adapt to your progress.
- **Google Gemini Integration:** An intelligent, context-aware AI Tutor that can answer questions, provide code snippets, and offer encouragement.
- **Adaptive Quizzing:** Gamified quizzes that dynamically scale in difficulty based on your performance.
- **Glassmorphic UI:** A stunning, modern interface featuring Aurora gradients, particle physics, and smooth micro-animations.
- **Scalable Architecture:** Built with React, Vite, TailwindCSS, Zustand, and Firebase.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **Styling:** TailwindCSS, Framer Motion
- **State Management:** Zustand
- **Backend/Auth:** Firebase (Authentication, Firestore)
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Data Visualization:** Recharts, Matter.js

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- A [Google AI Studio](https://aistudio.google.com/) API Key
- A [Firebase](https://console.firebase.google.com/) Project (optional, but required for live authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itzxsrikanth/Study-X.git
   cd Study-X/tutor-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `tutor-frontend` directory and add your keys:
   ```env
   VITE_GEMINI_API_KEY="your_gemini_api_key_here"
   
   # Optional: Firebase Config
   VITE_FIREBASE_API_KEY=""
   VITE_FIREBASE_AUTH_DOMAIN=""
   VITE_FIREBASE_PROJECT_ID=""
   ```

4. Start the Development Server:
   ```bash
   npm run dev
   ```

## 🎨 UI Showcase
The platform utilizes a custom-built design system with a dark-mode first approach, heavily featuring glassmorphism, glowing accents, and fluid transitions to create an immersive learning environment.

## 🤝 Contributing
Contributions are always welcome! Please open an issue or submit a pull request for any bugs, improvements, or feature requests.
