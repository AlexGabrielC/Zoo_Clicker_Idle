// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Définissez ici éventuellement les types de l'utilisateur (pour simplifier, nous utilisons any)
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

  // Écouter les changements de l'authentification Firebase
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Vérifier la disponibilité des Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Lancer le processus de connexion et obtenir l’ID token
      const { idToken } = (await GoogleSignin.signIn()) as any;
      // Créer les informations d'identification Firebase à partir du token Google
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Se connecter à Firebase avec les informations d'identification
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Error during Google sign in: ', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
      // Déconnecter également du module Google Sign-In
      await GoogleSignin.signOut();
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
