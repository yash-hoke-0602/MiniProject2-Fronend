import React, { useState } from "react";
import { View, Text, Button, Pressable, Image } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { url } from "../components/url";

const Profile = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.1, backgroundColor: "#694fad" }}>
        <View style={{ marginTop: 10, flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }}>
            <Pressable onPress={() => props.navigation.openDrawer()}>
              <Icon name="drag" size={40} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>Profile</Text>
        </View>
      </View>
      <View style={{ flex: 0.9 }}>
        <Text>Cool</Text>
        <Image
          source={{
            uri: url + "/profiles/userName.jpg",

            width: 200,
            height: 200,
          }}
        />
      </View>
    </View>
  );
};

export default Profile;
