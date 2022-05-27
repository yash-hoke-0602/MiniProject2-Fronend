import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { url } from "../components/url";

export function BotsNavContent(props) {
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [PRN, setPRN] = useState("");

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    props.navigation.replace("Login");
  };

  const loadData = async () => {
    const token = await AsyncStorage.getItem("token");
    fetch(url + "/profile", {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        //console.log(data);
        setEmail(data.email);
        setImg(data.profData.image);
        setName(data.profData.name);
        setPRN(data.profData.prn);
      });
  };
  useEffect(() => {
    loadData();
  });
  // ------Use this in future---------
  // useEffect(() => {
  //     loadData();
  //   },[]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  width: 720,
                  height: 812,
                  uri: url + img,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>{PRN}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {email}
                </Paragraph>
                {/* <Caption style={styles.caption}>Post</Caption> */}
              </View>
              {/* <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  0
                </Paragraph>
                <Caption style={styles.caption}>Viewers</Caption>
              </View> */}
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Search Bot"
              onPress={() => {
                props.navigation.navigate("SearchBot");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Grammer Bot"
              onPress={() => {
                props.navigation.navigate("GrammerBot");
              }}
            /> */}
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Utility Bot"
              onPress={() => {
                props.navigation.navigate("UtilityBot");
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Reader Bot"
              onPress={() => {
                props.navigation.navigate("ReaderBot");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Game Bot"
              onPress={() => {
                props.navigation.navigate("GameBot");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                console.log("theme");
              }}
            >
              {/* <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={true} />
                </View>
              </View> */}
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="nut" color={color} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  props.navigation.navigate("SettingsScreen");
                }}
              />
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
