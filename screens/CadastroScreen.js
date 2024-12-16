import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroScreen({ navigation }) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const handleSave = async () => {
        if (name && gender) {
            await AsyncStorage.setItem('userName', name);
            await AsyncStorage.setItem('userGender', gender);
            navigation.navigate('Home');
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu nome"
                value={name}
                onChangeText={setName}
            />
            <Picker
                selectedValue={gender}
                onValueChange={setGender}
                style={styles.input}
            >
                <Picker.Item label="Selecione seu gênero" value="" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Feminino" value="feminino" />
                <Picker.Item label="Outro" value="outro" />
            </Picker>
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
        marginBottom: 20,
        paddingLeft: 10,
    },
});
