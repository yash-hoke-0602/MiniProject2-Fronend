import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { BotsNavContent } from "./botsNavContent";

import GrammerBot from "./grammerBot";
import ReaderBot from "./readerBot";
import UtilityBot from "./utilityBot";
import GameBot from "./gameBot";
import SearchBot from "./searchBot";

const Drawer = createDrawerNavigator();

function BotsDrawerNav(props) {
  return (
    <Drawer.Navigator
      initialRouteName="UtilityBot"
      backBehavior="history"
      openByDefault={false}
      drawerType="slide"
      edgeWidth={100}
      hideStatusBar={false}
      statusBarAnimation={true}
      overlayColor="black"
      drawerStyle={{
        backgroundColor: "lightgrey",
        width: 240,
      }}
      drawerContent={(props) => <BotsNavContent {...props} />}
    >
      <Drawer.Screen name="GrammerBot" component={GrammerBot} />
      <Drawer.Screen name="ReaderBot" component={ReaderBot} />
      <Drawer.Screen name="UtilityBot" component={UtilityBot} />
      <Drawer.Screen name="GameBot" component={GameBot} />
      <Drawer.Screen name="SearchBot" component={SearchBot} />
    </Drawer.Navigator>
  );
}

export default BotsDrawerNav;
