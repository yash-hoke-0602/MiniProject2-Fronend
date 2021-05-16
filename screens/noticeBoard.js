import React from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";

const NoticeBoard = (props) => {
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
          <Text style={{ fontSize: 30, color: "white" }}>NoticeBoard</Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
        <Card style={{ margin: 20 }}>
          <Text style={styles.paragraph}>Tomorrow is Holiday</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
});

export default NoticeBoard;
