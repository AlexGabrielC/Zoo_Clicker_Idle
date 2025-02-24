// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qbgllhiaylxcqtslzxzk.supabase.co'; // Remplacez par l'URL de votre projet Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiZ2xsaGlheWx4Y3F0c2x6eHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDI3MjIsImV4cCI6MjA1NTk3ODcyMn0.Pwj33gcGqxZiAo72GXCbhHCCWpo5dnU97i7VUUckD6g'; // Remplacez par votre clé publique (anon key)

export const supabase = createClient(supabaseUrl, supabaseKey);
