import React, { useState, useEffect, TouchableOpacity } from "react";
import * as Speech from "expo-speech";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js";

import { url } from "../components/url";

const urlv = url + "/readerBot/upload";

const createFormData = (photo) => {
  console.log(photo);
  var uri = photo.uri;
  let uriArray = uri.split(".");
  let fileType = uriArray[uriArray.length - 1];

  let formData = new FormData();
  formData.append("photo", {
    uri,
    name: `userName.${fileType}`,
    type: `image/${fileType}`,
    // name: photo.fileName,             -----------------------error photo do not have fileName attribute
    // type: photo.type + "/jpg",
    // uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  return formData;
};

export default function ReaderBot(props) {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);
  const [docSelected, setDocSelected] = useState(false);
  const [user, setUserId] = useState("");
  const [docText, setDocText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const loadData = async () => {
    const token = await AsyncStorage.getItem("token");
    // console.log("SelectPost");
    fetch(url + "/readerBot/getUser", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserId(res.userId);
        console.log(res.userId);
        // setReady(true);
      });
  };

  useEffect(() => {
    loadData();
  }, [ready]);

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
    formData.append("user", user);

    await fetchWithResponse(urlv, formData);
    // if (status === "SUCCESS") console.log({ responseData });
    // else console.log("error");
  };

  const onSelectDocument = async () => {
    setDocSelected(true);
    let file = await DocumentPicker.getDocumentAsync({ type: "application/*" });
    if (file.type !== "cancel") {
      //console.log(file);
      upload(file);
    } else {
      //console.log("cancel");
    }
  };

  const onUploadConvert = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(docSelected);
    if (docSelected) {
      console.log(docText + "ho");
      // if (!docText) {
      console.log("hi");
      fetch(url + "/readerBot/convert", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setDocText(res.pdfText);
          // console.log(res.userId);
          setReady(true);
        });
      // }
    } else {
      // if (docText) {
      fetch(url + "/readerBot/convertImage", {
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setDocText(res.pdfText);
          // console.log(res.userId);
          setReady(true);
        });
      // }
    }
  };

  const onRead = async () => {
    console.log(Speech.getAvailableVoicesAsync());
    Speech.stop();
    Speech.speak(docText);
  };

  const onSelectImage = async () => {
    setDocSelected(false);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      console.log("error");
      return;
    }
    console.log(pickerResult);
    setSelectedImage(pickerResult);

    const token = await AsyncStorage.getItem("token");

    fetch(url + "/readerBot/uploadImage", {
      method: "POST",
      body: createFormData(selectedImage),
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Select Document" onPress={onSelectDocument} />
      </View>

      <View style={styles.container}>
        <Button title="Select Image" onPress={onSelectImage} />
      </View>

      <View style={styles.container}>
        <Button title="Upload" onPress={onUploadConvert} />
      </View>

      <View style={styles.container}>
        <Button title="Read" onPress={onRead} />
      </View>

      <View style={styles.container}>
        <Button title="Stop" onPress={() => Speech.stop()} />
      </View>

      {ready ? (
        <ScrollView>
          <Text>{docText}</Text>
        </ScrollView>
      ) : (
        <Text>Select a doc</Text>
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
