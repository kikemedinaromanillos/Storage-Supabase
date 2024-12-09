import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '@core/supabase/client';
import { Task } from '@features/tasks/models/Task';

interface TaskFormProps {
  onSave: () => void; // Callback para notificar al componente padre cuando se guarde una tarea
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      console.error('Por favor, completa todos los campos');
      return;
    }

    console.log('Datos del formulario:', { title, description });

    const user = await supabase.auth.getUser(); // Obtén el usuario autenticado
    const userId = user?.data.user?.id || process.env.EXPO_PUBLIC_ID_PRUEBAS;

    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          user_id: userId,
        },
      ]);

    if (!error) {
      onSave();
      setTitle('');
      setDescription('');
    } else {
      console.error('Error al guardar la tarea:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f7fc', // Fondo común
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Color consistente
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff', // Botón de la misma gama de color
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskForm;