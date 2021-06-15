import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";

import { Card } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { url } from "../components/url";

const Profile = (props) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [PRN, setPRN] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [pointer, setPointer] = useState("");
  const [internship, setInternship] = useState("");
  const [achievement, setAchievement] = useState("");
  const [placement, setPlacement] = useState("");

  const [refreshing, setRefreshing] = useState(false);

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
        setEmail(data.email);
        setImage(data.profData.image);
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
  }, [refreshing]);

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
          <Text style={{ fontSize: 30, color: "white" }}>Profile</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 0.9, backgroundColor: "lightyellow" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ backgroundColor: "black" }}>
          <Image source={{ uri: url + image }} style={styles.thumbnail} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Name:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {name}
            </Text>
          </Card>

          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Email:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {email}
            </Text>
          </Card>

          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              PRN:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {PRN}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Branch:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {branch}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Year:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {year}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Address:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {address}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Internship:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {internship}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Pointer:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {pointer}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Achievement:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {achievement}
            </Text>
          </Card>
          <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
            <Text
              style={{
                color: "maroon",
                backgroundColor: "lightblue",
                borderRadius: 5,
                padding: 5,
                fontSize: 20,
              }}
            >
              Placement:-
            </Text>
            <Text
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
            >
              {placement}
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  thumbnail: {
    margin: 10,
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
