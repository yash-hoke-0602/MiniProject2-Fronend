import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 16.8457,
          longitude: 74.6015,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        }}
      >
        <Marker
          key={5}
          coordinate={{ latitude: 16.8457, longitude: 74.6015 }}
          title={"WCE"}
          description={"This is main building"}
        />
        <Marker
          key={6}
          coordinate={{ latitude: 16.84583, longitude: 74.6003 }}
          title={"CCF"}
          description={"Central Computing Facility"}
        />

        <Marker
          key={4}
          coordinate={{ latitude: 16.846, longitude: 74.6004 }}
          title={"Chemistry Dept"}
          description={"Chemistry Dept for FY"}
        />
        <Marker
          key={2}
          coordinate={{ latitude: 16.8445, longitude: 74.6013 }}
          title={"Tilak Hall"}
          description={"Todays Main Event"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
