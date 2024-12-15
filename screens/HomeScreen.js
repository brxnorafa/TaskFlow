import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    // Função para salvar as tarefas no AsyncStorage
    async function saveTasks(tasks) {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Erro ao salvar tarefas:', error);
        }
    }

    // Função para carregar tarefas do AsyncStorage
    async function loadTasks() {
        try {
            const tasksData = await AsyncStorage.getItem('tasks');
            if (tasksData) {
                setTasks(JSON.parse(tasksData));
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
    }

    // Carregar tarefas assim que o componente for montado
    useEffect(() => {
        loadTasks();
    }, []);

    // Função para adicionar tarefa
    function addTask() {
        if (taskInput.trim()) {
            const newTask = { id: Date.now(), text: taskInput, completed: false };
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
            setTaskInput('');
        }
    }

    // Função para alterar status da tarefa
    function toogleTaskStatus(id) {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    }

    // Função para excluir tarefa
    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TaskFlow</Text>
            <TextInput
                style={styles.input}
                placeholder="Adicione uma nova tarefa"
                value={taskInput}
                onChangeText={setTaskInput}
            />
            <Button title="Adicionar" onPress={addTask} />

            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} onLongPress={() => deleteTask(item.id)}>
                        <Text style={[styles.task, item.completed && styles.completedTask]}>
                            {item.text}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingLeft: 10,
      marginBottom: 10,
    },
    task: {
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    completedTask: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
  });