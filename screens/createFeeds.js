import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { url } from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ModalDropdown from "react-native-modal-dropdown";

function CreateFeeds(props) {
  const [folderName, setFolderName] = useState("");
  const [folderTag, setFolderTag] = useState("");
  const [folderDesc, setFolderDesc] = useState("");

  const createFolderEvent = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/feeds/addfolder", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderName: folderName,
        folderDesc: folderDesc,
        folderTag: folderTag,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        props.navigation.navigate("SelectPosts", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.15, backgroundColor: "maroon" }}>
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
          <Text style={{ marginBottom: 10, fontSize: 30, color: "white" }}>
            Create Folder
          </Text>
        </View>
      </View>
      <View style={{ flex: 0.8 }}>
        <KeyboardAvoidingView behavior="height">
          <Text>Folder Name:-</Text>
          <TextInput
            label="folderName"
            value={folderName}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setFolderName(text)}
          />
          <Text>Folder Tag:-</Text>
          <ModalDropdown
            onSelect={(index, value) => setFolderTag(value)}
            style={{ marginTop: 10, marginLeft: 20 }}
            dropdownStyle={{
              marginLeft: 50,
            }}
            textStyle={{
              padding: 10,
              fontSize: 20,
              borderWidth: 2,
              borderColor: "lightblue",
              backgroundColor: "dodgerblue",
            }}
            options={[
              "Civil",
              "Computer",
              "Electrical",
              "Electronics",
              "Information-Tech",
              "Mechanical",
            ]}
          />

          <Text>Folder Description:-</Text>
          <TextInput
            label="folderDesc"
            value={folderDesc}
            multiline
            numberOfLines={4}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setFolderDesc(text)}
          />

          <Button title="Create Folder" onPress={createFolderEvent} />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default CreateFeeds;
