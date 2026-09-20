# Tuga's App - Login Page Assessment

This repository contains the implementation of the login page UI and Firebase Google Authentication for the code3x internship assessment.

## Technologies Used

- React (Vite)
- TypeScript
- Material UI (MUI)
- Firebase Authentication & Firebase Hosting
- React Router

## Features

- Responsive two-column layout matching the assessment design.
- Form input validation for email format and required password fields.
- Password visibility toggle.
- Google Sign-In integrated with Firebase Authentication.
- Redirection to dashboard upon login with sign-out capability.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Run Locally

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

## Deployment to Firebase Hosting

```bash
npm run build
npx firebase login
npx firebase deploy --only hosting
```
