// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface AuthContextProps {
  user: any;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  // Configure Google Signin (make sure your webClientId is correct)
  GoogleSignin.configure({
    webClientId: '868939013927-cbd8ckcj8rj2io62nrd37qa8aasmet65.apps.googleusercontent.com',
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    console.log('signInWithGoogle triggered');
    try {
      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('Google Play Services are available');

      // Launch Google Sign-In flow
      const result = await GoogleSignin.signIn();
      console.log('Google Sign-In result:', result);

      const { idToken } = result as unknown as { idToken: string };
      if (!idToken) {
        throw new Error('No idToken returned');
      }

      // Create Firebase credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('Firebase sign-in successful');
    } catch (error: any) {
      console.error('Error during Google sign in: ', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      await GoogleSignin.signOut();
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during sign out: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
