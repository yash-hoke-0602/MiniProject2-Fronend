import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { url } from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createFormData = (photo) => {
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

const Update = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    console.log(pickerResult);
    setSelectedImage(pickerResult);
  };

  const handleUploadPhoto = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/profile/uploadPhoto", {
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
          <Text style={{ fontSize: 30, color: "white" }}>Update Profile</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 0.9 }}>
        <View>
          {selectedImage !== null ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.thumbnail}
            />
          ) : (
            <Text>Select Image</Text>
          )}
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={[styles.button, { backgroundColor: "gold" }]}
          >
            <Text>Pick a photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUploadPhoto}
            style={[styles.button, { backgroundColor: "dodgerblue" }]}
          >
            <Text>Upload photo</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>Email:-</Text>
          <TextInput
            label="Email"
            value={userName}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setUserName(text)}
          />
          <Text>Name:-</Text>
          <TextInput
            label="Name"
            value={name}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Update;

const styles = StyleSheet.create({
  thumbnail: {
    margin: 10,
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
  button: {
    margin: 10,
    padding: 5,
    alignSelf: "center",
    alignItems: "center",
    width: 150,
    height: 30,
    backgroundColor: "red",
  },
});
