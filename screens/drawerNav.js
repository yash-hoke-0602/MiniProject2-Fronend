import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./profile";
import Update from "./update";
import LoginScreen from "./LoginScreen";
import NoticeBoard from "./noticeBoard";

import { DrawerContent } from "./drawerContent";

const Drawer = createDrawerNavigator();

function DrawerNav(props) {
  return (
    <Drawer.Navigator
      initialRouteName="NoticeBoard"
      backBehavior="history"
      openByDefault={false}
      drawerType="slide"
      edgeWidth={200}
      hideStatusBar={false}
      statusBarAnimation={true}
      overlayColor="black"
      drawerStyle={{
        backgroundColor: "#c6cbef",
        width: 240,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="NoticeBoard" component={NoticeBoard} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Update" component={Update} />
      <Drawer.Screen name="Login" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
