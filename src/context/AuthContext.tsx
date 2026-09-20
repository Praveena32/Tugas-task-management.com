import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';

export interface AuthUserData {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  accessToken: string;
  idToken?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  currentUser: AuthUserData | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<AuthUserData>;
  logout: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUserData | null>(() => {
    const saved = sessionStorage.getItem('tugas_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const configured = isFirebaseConfigured();

  useEffect(() => {
    if (configured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
        if (firebaseUser) {
          try {
            const idToken = await firebaseUser.getIdToken();
            const token = (firebaseUser as unknown as { accessToken?: string }).accessToken || idToken;
            const userData: AuthUserData = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
              accessToken: token,
              idToken,
            };
            setCurrentUser(userData);
            sessionStorage.setItem('tugas_auth_user', JSON.stringify(userData));
          } catch (e) {
            console.error('Error getting token:', e);
          }
        } else if (!sessionStorage.getItem('tugas_auth_user_demo')) {
          setCurrentUser(null);
          sessionStorage.removeItem('tugas_auth_user');
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [configured]);

  const signInWithGoogle = async (): Promise<AuthUserData> => {
    setError(null);
    setLoading(true);

    if (configured && auth) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const googleAccessToken = credential?.accessToken;
        const idToken = await result.user.getIdToken();
        const primaryToken = googleAccessToken || (result.user as unknown as { accessToken?: string }).accessToken || idToken;

        const userData: AuthUserData = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          accessToken: primaryToken,
          idToken,
          isDemo: false,
        };

        setCurrentUser(userData);
        sessionStorage.setItem('tugas_auth_user', JSON.stringify(userData));
        setLoading(false);
        return userData;
      } catch (err: unknown) {
        const firebaseErr = err as { code?: string; message?: string };
        const msg = firebaseErr.message || 'Failed to sign in with Google';
        setError(msg);
        setLoading(false);
        throw err;
      }
    } else {
      // Graceful fallback for local development/preview before Firebase keys are entered
      await new Promise((resolve) => setTimeout(resolve, 600));
      const demoToken = 'ya29.a0AfH6SMD_demo_mock_google_access_token_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const demoUserData: AuthUserData = {
        uid: 'demo-google-uid-123456',
        displayName: 'Tuga Designer',
        email: 'tuga.user@example.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        accessToken: demoToken,
        idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMyJ9.demo_preview_token_sample.xyz',
        isDemo: true,
      };
      setCurrentUser(demoUserData);
      sessionStorage.setItem('tugas_auth_user', JSON.stringify(demoUserData));
      sessionStorage.setItem('tugas_auth_user_demo', 'true');
      setLoading(false);
      return demoUserData;
    }
  };

  const logout = async () => {
    if (configured && auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem('tugas_auth_user');
    sessionStorage.removeItem('tugas_auth_user_demo');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        signInWithGoogle,
        logout,
        isConfigured: configured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
