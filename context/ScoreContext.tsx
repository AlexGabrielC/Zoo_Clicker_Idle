// context/ScoreContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/supabase';

interface ScoreContextProps {
  saveScore: (userId: string, score: number) => Promise<void>;
  scores: { id: string; user_id: string; score: number; created_at: string }[];
  fetchScores: () => Promise<void>;
}

const ScoreContext = createContext<ScoreContextProps>({
  saveScore: async () => {},
  scores: [],
  fetchScores: async () => {},
});

export const useScore = () => useContext(ScoreContext);

interface ScoreProviderProps {
  children: ReactNode;
}

export const ScoreProvider: React.FC<ScoreProviderProps> = ({ children }) => {
  const [scores, setScores] = useState<{ id: string; user_id: string; score: number; created_at: string }[]>([]);

  const saveScore = async (userId: string, score: number) => {
    const { data, error } = await supabase
      .from('scores')
      .insert([{ user_id: userId, score }])
      .select();
    if (error) throw error;
    if (data) {
      setScores([...scores, ...data]);
    }
  };

  const fetchScores = async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    setScores(data as { id: string; user_id: string; score: number; created_at: string }[]);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <ScoreContext.Provider value={{ saveScore, scores, fetchScores }}>
      {children}
    </ScoreContext.Provider>
  );
};
