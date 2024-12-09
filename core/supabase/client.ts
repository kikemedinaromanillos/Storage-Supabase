import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vfbakezswrdztjgjserw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYmFrZXpzd3JkenRqZ2pzZXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3ODU0MTIsImV4cCI6MjA0ODM2MTQxMn0.DPu_eO7emVtI-7vSbc0rxuba4nulVNL3xZW6lf1iZ5g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Prueba de conexión
export const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('tasks').select('*').limit(1);
      if (error) {
        console.error('Error al conectar con Supabase:', error);
      } else {
        console.log('Conexión exitosa. Datos:', data);
      }
    } catch (err) {
      console.error('Error inesperado:', err);
    }
  };