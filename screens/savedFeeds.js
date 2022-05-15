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
  TouchableHighlight,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import { url } from "../components/url";

const SavedFeeds = (props) => {
  const [folders, setFolders] = useState([]);
  const [likedFolders, setLikedFolders] = useState([]);
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [like, setLike] = useState(false);

  const loadData = async () => {
    const token = await AsyncStorage.getItem("token");
    var filter = "";
    filter =
      filter +
      " Civil Computer Electrical Electronics Mechanical Information-Tech";

    // fetch("http://192.168.43.170:9000/test")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    fetch("http://192.168.1.9:5000/find")
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
      });
    fetch(url + "/feeds/allLikedFolders", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          //console.log(data.msg);
        } else {
          setLikedFolders(data);
          console.log(data);
        }
      });

    fetch(url + "/feeds/allFolders/" + filter, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          //console.log(data.msg);
        } else {
          setFolders(data);
          //console.log(data);
        }
        setReady(true);
      });
    setLike(false);
  };
  useEffect(() => {
    loadData();
  }, [refreshing, ready]);

  const Item = ({ name, tag, desc, folderId, author, date }) => (
    <Pressable
      onPress={() =>
        props.navigation.navigate("SelectPosts", {
          folderId,
          deletButton: false,
        })
      }
    >
      <View style={styles.modalView}>
        <Text style={styles.title}>{"Folder Name:-" + name}</Text>
        <Text style={{ marginTop: 10, color: "blue" }}>
          {"Folder Tag:-" + tag}
        </Text>
        <Text style={{ marginBottom: 10, color: "black" }}>
          {"Folder Description:-" + desc}
        </Text>

        <Text
          style={{ marginBottom: 10, color: "black", alignSelf: "flex-end" }}
        >
          {"author:-" + author}
        </Text>

        <Text
          style={{ marginBottom: 10, color: "black", alignSelf: "flex-end" }}
        >
          {"created on:-" + date.split("T")[0]}
        </Text>
        <Button
          color={
            likedFolders.find((element) => element.folderid == folderId)
              ? "#0055dd"
              : "#999999"
          }
          title="Like"
          onPress={() => likePostEvent(folderId)}
        />
      </View>
    </Pressable>
  );

  const likePostEvent = async (folderId) => {
    const isFolderLiked = likedFolders.find(
      (element) => element.folderid == folderId
    );
    const token = await AsyncStorage.getItem("token");

    if (isFolderLiked) {
      fetch(url + "/feeds/unlikeFolder/" + folderId, {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }).then((res) => setLike(true));
    } else {
      fetch(url + "/feeds/likeFolder/" + folderId, {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      }).then((res) => setLike(true));
    }
  };

  const renderItem = ({ item }) => (
    <Item
      name={item.foldername}
      tag={item.foldertag}
      desc={item.folderdescription}
      folderId={item._id}
      author={item.author}
      date={item.date}
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.1, backgroundColor: "maroon" }}>
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
          <Text style={{ fontSize: 30, color: "white" }}>Recommendation</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
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
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "white",
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

export default SavedFeeds;
