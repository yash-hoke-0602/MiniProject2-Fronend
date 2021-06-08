import React from "react";
import FeedsDrawerNav from "./feedsDrawerNav";
import { Text, View } from "react-native";

const Feeds = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <FeedsDrawerNav />
    </View>
  );
};

export default Feeds;
