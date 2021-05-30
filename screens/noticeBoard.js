import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import { url } from "../components/url";

const Item = ({ text, email }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{text}</Text>
    <Text>{"Notice From - " + email}</Text>
  </View>
);

const NoticeBoard = (props) => {
  const [notice, setNotice] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(url + "/noticeBoard/view")
      .then((response) => response.json())
      .then((data) => {
        setNotice(data);
        setReady(true);
      });
  }, []);

  const renderItem = ({ item }) => <Item text={item.text} email={item.email} />;

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
      <View style={{ flex: 0.9 }}>
        {ready ? (
          <FlatList
            data={notice}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
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
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "lightgreen",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default NoticeBoard;
