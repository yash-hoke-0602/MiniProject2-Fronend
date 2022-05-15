import React, { useState } from "react";

import {
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../components/url";
import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js";

function SearchBot(props) {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  const searchQuery = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(searchText);
    fetch(url + "/bots/pdfSearch", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchText,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        setPosts(response);
        setReady(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const Item = ({ name, address, id }) => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Pressable
          style={{
            flex: 1,
          }}
          onPress={() => props.navigation.navigate("PdfViewer", { address })}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.postData.postname}
      address={item.postData.postaddress}
      id={item.postData._id}
    />
  );

  return (
    <View>
      <Text style={{ padding: 50 }}>SearchBot</Text>
      <TextInput
        label="Search"
        value={searchText}
        style={{
          margin: 15,
          borderRadius: 5,
          borderColor: "lightblue",
          borderWidth: 1,
          padding: 5,
        }}
        placeholder="Enter your query"
        theme={{ colors: { primary: "blue" } }}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button
        mode="contained"
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        onPress={searchQuery}
        title="Search"
      />

      {posts.length ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.postData._id}
        />
      ) : (
        <Text>No results</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
  },
  item: {
    backgroundColor: "#0aaa",
    marginVertical: 10,
  },
  title: {
    padding: 10,
    fontSize: 12,
    color: "black",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default SearchBot;
