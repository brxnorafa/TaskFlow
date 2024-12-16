import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import CadastroScreen from "../screens/CadastroScreen";

// Cria o Stack Navigator
const Stack = createStackNavigator();

// Cria o Bottom Tab Navigator
const Tab = createBottomTabNavigator();


function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#f0f',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="house" size={size} color={color} /> 
                    ),
                }}
            />
            
            {/* Adicionar mais páginas conforme acima */}
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="Start">
            <Stack.Screen 
                name="Start"
                component={StartScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro"
                component={CadastroScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}