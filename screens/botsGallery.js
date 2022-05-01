import * as React from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";

import BotsDrawerNav from "./botsDrawerNav";

export default function BotsGallery() {
  return (
    <View style={{ flex: 1 }}>
      <BotsDrawerNav />
    </View>
  );
}
