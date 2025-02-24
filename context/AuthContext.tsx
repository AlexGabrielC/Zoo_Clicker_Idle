import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/supabase'; // Assurez-vous d'avoir configuré Supabase
import { Session } from '@supabase/supabase-js';

interface AuthContextProps {
  user: Session | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session);  // On passe 'session' complet ici
    };

    fetchSession();

    // Écouter les changements d'état d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Changement d\'état d\'authentification:', event, session);
      setUser(session); // Ici, on passe 'session', pas juste 'user'
    });

    // Désabonnement proprement lorsque le composant se démonte
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setUser({ user, access_token: 'access_token', refresh_token: 'refresh_token' } as Session);  // Remplacez par les données réelles de la session
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser({ user, access_token: 'access_token', refresh_token: 'refresh_token' } as Session);  // Remplacez par les données réelles de la session
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  };

  return (
      <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
  );
};
