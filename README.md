# Tuga's App - Modern Login UI & Firebase Google Authentication

This project is an implementation of the **Internship Technical & Creative Assessment** for **code3x**.

It features a pixel-perfect, modern, responsive Login Page UI built according to the provided design specifications, with form validation, Firebase Google Authentication, token display redirection, and Firebase Hosting configuration.

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI v6)](https://mui.com/) + `@emotion/react` + `@emotion/styled` + `@mui/icons-material`
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) (Google Sign-In with OAuth Popup)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Inter*)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## ✨ Features & Attention to Detail

1. **Pixel-Perfect Left Column (Login Form)**:
   - Bold "Welcome back!" heading with matching typography and line-height.
   - Subtitle: *"Simplify your workflow and boost your productivity with Tuga's App. Get started for free."*
   - Rounded pill inputs (`border-radius: 9999px`) with custom subtle borders and focus rings.
   - Real-time input validation (email format regex check, password length verification, instant error states).
   - Password visibility toggle (eye icon button).
   - Right-aligned "Forgot Password?" action with interactive feedback.
   - Solid black rounded pill "Login" button with hover micro-animations.
   - Elegant "or continue with" divider.
   - 3 circular social login buttons: **Google** (triggers Firebase Auth), **Apple**, and **Facebook**.
   - "Not a member? Register now" interactive footer.

2. **Pixel-Perfect Right Column (Illustration Panel)**:
   - Soft cream/sage rounded card (`#F5F6EE`) matching design specifications.
   - High-fidelity meditation illustration of a person floating cross-legged with glowing mint heart.
   - Floating contact/collaborator avatars with lime-green and dark circular accent rings.
   - Floating "Canva Design" task badge:
     - 10 Task counter
     - 84% circular progress gauge ring
     - "Design" pill chip
   - 3 carousel pagination indicators (interactive active pill dot).
   - Bottom caption: *"Make your work easier and organized with Tuga's App"*.

3. **Firebase Google Authentication & Access Token Display**:
   - Integrated Google Authentication using `signInWithPopup`.
   - On successful sign-in, seamlessly redirects to `/dashboard`.
   - Displays user's **`accessToken`** prominently in a monospace developer console block with one-click **"Copy Token"** functionality.
   - Displays Firebase ID Token (JWT), user profile avatar, name, email, and UID.
   - Sign Out button that revokes authentication and safely redirects back to `/`.

4. **Mobile Responsiveness**:
   - Smoothly adapts from large desktop displays (split layout) to mobile screens (vertical stacked layout).

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation
```bash
git clone <your-repo-url>
cd cordex
npm install
```

### 3. Firebase Configuration
Create a `.env` file in the root directory (based on `.env.example`):
```bash
cp .env.example .env
```
Fill in your Firebase web app keys from the [Firebase Console](https://console.firebase.google.com/):
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef...
```

> **Note**: Even if Firebase credentials are not yet configured in `.env`, the application includes an automatic development fallback that permits testing the complete Google login redirect flow and accessToken display.

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Firebase Hosting

1. Install the Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   npx firebase login
   ```
3. Initialize / Select your Firebase project:
   ```bash
   npx firebase use --add
   ```
4. Deploy the build:
   ```bash
   npm run build
   npx firebase deploy --only hosting
   ```
5. Your app will be live at: `https://<your-project-id>.web.app`

---

## 📂 Project Structure

```
cordex/
├── .env.example             # Template for Firebase credentials
├── firebase.json            # Firebase Hosting configuration (SPA routing)
├── .firebaserc              # Firebase project target
├── index.html               # Main HTML entry with Google Fonts
├── package.json             # Dependencies and build scripts
├── vite.config.ts           # Vite configuration
└── src/
    ├── assets/              # Images, SVGs, and brand assets
    │   └── meditation.jpg   # Meditation illustration asset
    ├── components/
    │   ├── illustration/    # Right side illustration panel & floating widgets
    │   │   └── IllustrationPanel.tsx
    │   └── login/           # Left side login form & social auth buttons
    │       ├── LoginForm.tsx
    │       └── SocialIcons.tsx
    ├── config/              # Firebase SDK initialization
    │   └── firebase.ts
    ├── context/             # Auth Context managing user state & tokens
    │   └── AuthContext.tsx
    ├── pages/               # Application views
    │   ├── LoginPage.tsx    # Split-screen responsive login view
    │   └── DashboardPage.tsx# Access token and user profile display
    ├── theme/               # Custom Material UI theme configuration
    │   └── theme.ts
    ├── App.tsx              # Router and theme providers
    ├── index.css            # Base CSS reset
    └── main.tsx             # React DOM root entry
```

---

## 📝 Assessment Submission

- **Assessment**: Software Engineering Intern - Full Stack
- **Company**: code3x
- **Submission Date**: September 2026
