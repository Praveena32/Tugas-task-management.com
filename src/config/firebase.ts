import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCids0RRxS6d5VOxysmx_GKeD__fLVKyP8',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tugas-task-management.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tugas-task-management',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tugas-task-management.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '773743536990',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:773743536990:web:2051cb8994cd092817fdcf',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-96YZGYYXTJ',
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== '' &&
    !firebaseConfig.apiKey.includes('YOUR_') &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== ''
  );
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({ prompt: 'select_account' });

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
} catch (error) {
  console.warn('Firebase initialization warning:', error);
}

export { app, auth, googleProvider };
