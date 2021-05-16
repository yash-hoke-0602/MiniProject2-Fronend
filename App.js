import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native";
import { StyleSheet, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import HomeSceen from "./screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "./screens/tabs";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [isloggedin, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
