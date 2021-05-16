import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendCred = async (props) => {
    fetch("http://192.168.43.170:3000/signup", {
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
          SignUp page
        </Text>
        <View
          style={{
            borderBottomColor: "orange",
            borderBottomWidth: 4,
            borderRadius: 10,
            margin: 15,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 18,
            marginTop: 20,
          }}
        >
          create new account
        </Text>
        <TextInput
          label="Email"
          value={email}
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
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          onPress={() => sendCred(props)}
          title="signup"
        />
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              margin: 15,
              color: "blue",
            }}
            onPress={() => props.navigation.replace("Login")}
          >
            already have a account ?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;
