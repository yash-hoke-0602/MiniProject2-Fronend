import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";
import { Audio } from "expo-av";

export default class GameBot extends Component {
  state = {
    text: "",
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
        <Button
          title="Record"
          onPress={async () => {
            try {
              // await Permissions.askAsync(Permissions.AUDIO_RECORDING);
              await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS:
                  Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: false,
                interruptionModeAndroid:
                  Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
              });

              const recording = new Audio.Recording();
              await recording.prepareToRecordAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
              );
              await recording.startAsync();
              this.setState({ text: "started recording" });
              setTimeout(async () => {
                try {
                  console.log(recording.getURI());
                  await recording.stopAndUnloadAsync();
                  this.setState({ text: "stopped recording" });
                } catch (e) {
                  this.setState({ text: `error: ${e.message}` });
                }
              }, 1000); // increase to 1000 for it to work
            } catch (e) {
              this.setState({ text: `error: ${e.message}` });
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});
