import React, { useState, useEffect, TouchableOpacity } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js";

import { url } from "../components/url";

const urlv = url + "/feeds/upload";

export default function SelectPosts(props) {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  const { folderId, deletButton } = props.route.params;

  useEffect(() => {
    console.log("SelectPost");
    fetch(url + "/feeds/posts/" + folderId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setReady(true);
      });
  }, [ready]);

  const Item = ({ name, address, id }) => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Pressable
          style={{ flex: 0.8 }}
          onPress={() => props.navigation.navigate("PdfViewer", { address })}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </Pressable>
        {deletButton ? (
          <Pressable style={{ flex: 0.2 }} onPress={() => deletePostEvent(id)}>
            <View style={[styles.item, { backgroundColor: "#f008" }]}>
              <Text style={[styles.title, { color: "white" }]}>Delete</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable style={{ flex: 0.2 }}>
            <View style={[styles.item, { backgroundColor: "#0aaa" }]}>
              <Text style={[styles.title, { color: "white" }]}></Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );

  const deletePostEvent = (id) => {
    fetch(url + "/feeds/deletepost/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReady(false);
      });
  };

  const renderItem = ({ item }) => (
    <Item name={item.postname} address={item.postaddress} id={item._id} />
  );

  const fetchWithResponse = (urlv, body) => {
    const options = {
      method: "POST",
      body: body,
      headers: {
        Accept: "*/*",
        "content-type": "multipart/form-data",
      },
    };

    return new Promise((resolve, reject) => {
      fetch(urlv, options)
        .then((res) => res.json())
        .then((res) => setReady(false))
        .then((res) => resolve(res))
        .catch((err) => {
          reject(err);
        });
    });
  };

  const upload = async (data) => {
    const formData = new FormData();
    const info = {
      uri: data.uri,
      name: data.name,
      type: `application/${data.name.split(".").reverse()[0]}`,
    };

    formData.append("file", info);
    formData.append("folderId", folderId);

    await fetchWithResponse(urlv, formData);
    // if (status === "SUCCESS") console.log({ responseData });
    // else console.log("error");
  };

  const onSelectDocument = async () => {
    let file = await DocumentPicker.getDocumentAsync({ type: "application/*" });
    if (file.type !== "cancel") {
      //console.log(file);
      upload(file);
    } else {
      //console.log("cancel");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Select Document" onPress={onSelectDocument} />
      </View>
      <View>
        {ready ? (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <Text>Loading posts</Text>
        )}
      </View>
      <View style={styles.container}>
        <Button
          title="Done"
          onPress={() => props.navigation.navigate("MyFeeds")}
        />
      </View>
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
