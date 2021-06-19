import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MyFeeds from "./myFeeds";
import SearchFeeds from "./searchFeeds";
import CreateFeeds from "./createFeeds";
import SavedFeeds from "./savedFeeds";

import { FeedsNavContent } from "./feedsNavContent";

const Drawer = createDrawerNavigator();

function FeedsDrawerNav(props) {
  return (
    <Drawer.Navigator
      initialRouteName="MyFeeds"
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
      drawerContent={(props) => <FeedsNavContent {...props} />}
    >
      <Drawer.Screen name="MyFeeds" component={MyFeeds} />
      <Drawer.Screen name="SearchFeeds" component={SearchFeeds} />
      <Drawer.Screen name="CreateFeeds" component={CreateFeeds} />
      <Drawer.Screen name="SavedFeeds" component={SavedFeeds} />
    </Drawer.Navigator>
  );
}

export default FeedsDrawerNav;
