import React, { useEffect, useState } from "react";

import { Button, TextInput, View } from "react-native";
import { ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNav from "./drawerNav";

const HomeScreen = (props) => {
  const [email, setEmail] = useState("loading");

  const Boiler = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch("http://192.168.43.170:3000/", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  // const logout = (props) => {
  //   AsyncStorage.removeItem("token").then(() => {
  //     props.navigation.replace("Login");
  //   });
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{marginLeft:200}}>
    <Button 
         onPress={() => logout(props)}
        title="logout"
        />
   </View>
    <Text style={{fontSize:18}}>your email is {email}</Text> */}
      <DrawerNav />
    </View>
  );
};

export default HomeScreen;
