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
  RefreshControl,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import { url } from "../components/url";

const MyFeeds = (props) => {
  const [folders, setFolders] = useState([]);
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/feeds/folders", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFolders(data);
        setReady(true);
      });
  };
  useEffect(() => {
    loadData();
  }, [refreshing, ready]);

  const Item = ({ name, tag, desc, folderId }) => (
    <Pressable
      onPress={() => props.navigation.navigate("SelectPosts", { folderId })}
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>{"Folder Name:-" + name}</Text>
        <Text style={{ marginTop: 10, color: "blue" }}>
          {"Folder Tag:-" + tag}
        </Text>
        <Text style={{ marginBottom: 10, color: "black" }}>
          {"Folder Description:-" + desc}
        </Text>
        <Button
          color="red"
          title="Delete"
          onPress={() => deleteFolderEvent(folderId)}
        />
      </View>
    </Pressable>
  );

  const deleteFolderEvent = (id) => {
    fetch(url + "/feeds/deletefolder/" + id)
      .then((response) => response.json())
      .then((data) => {
        setReady(false);
      });
  };

  const renderItem = ({ item }) => (
    <Item
      name={item.foldername}
      tag={item.foldertag}
      desc={item.folderdescription}
      folderId={item._id}
    />
  );

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {ready ? (
          <FlatList
            data={folders}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 15,
    backgroundColor: "#55f4",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    backgroundColor: "orange",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 25,
  },
});

export default MyFeeds;
