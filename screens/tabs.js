import React from "react";
import { View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";
import Feeds from "./feeds";
import Map from "./map";
import BotsGallery from "./botsGallery";

const Tab = createMaterialBottomTabNavigator();

function Tabs(props) {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="history"
        shifting={false}
        labeled={true}
        activeColor="#f0edf6"
        inactiveColor="black"
        barStyle={{ backgroundColor: "maroon", paddingBottom: 0 }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Feeds"
          component={Feeds}
          options={{
            tabBarLabel: "Feeds",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Bots"
          component={BotsGallery}
          options={{
            tabBarLabel: "Bots",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default Tabs;
