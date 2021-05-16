import React from "react";
import { View, Text, Button, Pressable } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Update = (props) => {
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
          <Text style={{ fontSize: 30, color: "white" }}>Update Profile</Text>
        </View>
      </View>
      <View style={{ flex: 0.9 }}></View>
    </View>
  );
};

export default Update;
