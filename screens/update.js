import React from "react";
import { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [PRN, setPRN] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [pointer, setPointer] = useState("");
  const [internship, setInternship] = useState("");
  const [achievement, setAchievement] = useState("");
  const [placement, setPlacement] = useState("");

  const loadData = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/profile", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        setName(data.profData.name);
        setPRN(data.profData.prn);
        setBranch(data.profData.branch);
        var str = "" + data.profData.year;
        setYear(str);
        setAddress(data.profData.address);
        str = "" + data.profData.pointer;
        setPointer(str);
        setInternship(data.profData.internship);
        setAchievement(data.profData.acheivement);
        setPlacement(data.profData.placement);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

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

  const handleUploadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/profile/update", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        PRN: PRN,
        branch: branch,
        year: year,
        address: address,
        pointer: pointer,
        internship: internship,
        acheivement: achievement,
        placement: placement,
      }),
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
      <View style={{ flex: 0.2, backgroundColor: "#694fad" }}>
        <View style={{ marginTop: 20, flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1 }}>
            <Pressable onPress={() => props.navigation.openDrawer()}>
              <Icon name="drag" size={40} />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 30, color: "white" }}>Update Profile</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 0.8, margin: 10 }}>
        <View>
          {selectedImage !== null ? (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.thumbnail}
            />
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Select Image
            </Text>
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
          <Text>PRN:-</Text>
          <TextInput
            label="PRN"
            value={PRN}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setPRN(text)}
          />
          <Text>Branch:-</Text>
          <TextInput
            label="Branch"
            value={branch}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setBranch(text)}
          />

          <Text>Year:-</Text>
          <TextInput
            label="Year"
            value={year}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            keyboardType="numeric"
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setYear(text)}
          />
          <Text>Address:-</Text>
          <TextInput
            label="Address"
            multiline
            numberOfLines={3}
            value={address}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setAddress(text)}
          />
          <Text>Pointer:-</Text>
          <TextInput
            label="Pointer"
            keyboardType="numeric"
            value={pointer}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setPointer(text)}
          />
          <Text>Internship:-</Text>
          <TextInput
            label="Internship"
            value={internship}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            multiline
            numberOfLines={4}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setInternship(text)}
          />
          <Text>Achievement:-</Text>
          <TextInput
            label="Achievement"
            value={achievement}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            multiline
            numberOfLines={4}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setAchievement(text)}
          />
          <Text>Placement:-</Text>
          <TextInput
            label="Placement"
            value={placement}
            style={{
              margin: 15,
              borderRadius: 5,
              borderColor: "lightblue",
              borderWidth: 1,
              padding: 5,
            }}
            multiline
            numberOfLines={4}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setPlacement(text)}
          />

          <TouchableOpacity
            onPress={handleUploadProfile}
            style={[styles.button, { backgroundColor: "dodgerblue" }]}
          >
            <Text>Update Profile</Text>
          </TouchableOpacity>
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
