import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { url } from "../components/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={{ margin: 20 }}>
      <Text>CreateFeeds</Text>
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
      <TextInput
        label="folderTag"
        value={folderTag}
        style={{
          margin: 15,
          borderRadius: 5,
          borderColor: "lightblue",
          borderWidth: 1,
          padding: 5,
        }}
        theme={{ colors: { primary: "blue" } }}
        onChangeText={(text) => setFolderTag(text)}
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
    </View>
  );
}

export default CreateFeeds;
