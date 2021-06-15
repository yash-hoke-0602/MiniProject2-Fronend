import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { url } from "../components/url";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendCred = async (props) => {
    fetch(url + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem("token", data.token);
          props.navigation.replace("Tabs");
        } catch (e) {
          console.log("error ", e);
          Alert(e);
        }
      });
  };

  return (
    <View
      style={{
        margin: 30,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <Text style={{ fontSize: 30, marginLeft: 18, color: "orange" }}>
          SignIn Screen
        </Text>
        <View
          style={{
            borderBottomColor: "orange",
            borderBottomWidth: 4,
            borderRadius: 10,
            margin: 15,
          }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          placeholder="UserName"
          style={{
            margin: 15,
            borderRadius: 5,
            borderColor: "lightblue",
            borderWidth: 1,
            padding: 5,
          }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="password"
          mode="outlined"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={{
            margin: 15,
            borderRadius: 5,
            borderColor: "lightblue",
            borderWidth: 1,
            padding: 5,
          }}
          theme={{ colors: { primary: "blue" } }}
        />
        <Button
          mode="contained"
          style={{ margin: 15 }}
          onPress={() => sendCred(props)}
          title="Login"
        />

        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: "blue",
              margin: 15,
            }}
            onPress={() => props.navigation.replace("signup")}
          >
            dont have a account ?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
