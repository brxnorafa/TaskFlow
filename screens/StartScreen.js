import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StartScreen({ navigation }) {
    useEffect(() => {
        // Função para verificar se é o primeiro acesso
        async function checkFirstLaunch() {
            const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
            if (isFirstLaunch === null) {
                await AsyncStorage.setItem('isFirstLaunch', 'false');
            } else {
                // Se não for a primeira vez, redireciona diretamente para o Home
                navigation.replace('Home');
            }
        }

        checkFirstLaunch();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Let's Get Started!</Text>
            <Button 
                title="Start" 
                onPress={() => navigation.navigate('Cadastro')} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});