import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./routes/routes";

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}