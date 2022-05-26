import React, { Component, useState } from "react";
import { View, StyleSheet, Button, Text, FlatList } from "react-native";
import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";
import { Audio } from "expo-av";

import { Card, TextInput } from "react-native-paper";
// export default class GameBot extends Component {
//   state = {
//     text: "",
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{this.state.text}</Text>
//         <Button
//           title="Record"
//           onPress={async () => {
//             try {
//               await Permissions.askAsync(Permissions.AUDIO_RECORDING);
//               await Audio.setAudioModeAsync({
//                 allowsRecordingIOS: true,
//                 interruptionModeIOS:
//                   Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
//                 playsInSilentModeIOS: true,
//                 shouldDuckAndroid: false,
//                 interruptionModeAndroid:
//                   Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//               });

//               const recording = new Audio.Recording();
//               await recording.prepareToRecordAsync(
//                 Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//               );
//               await recording.startAsync();
//               this.setState({ text: "started recording" });
//               setTimeout(async () => {
//                 try {
//                   console.log(recording.getURI());
//                   await recording.stopAndUnloadAsync();
//                   this.setState({ text: "stopped recording" });
//                 } catch (e) {
//                   this.setState({ text: `error: ${e.message}` });
//                 }
//               }, 1000); // increase to 1000 for it to work
//             } catch (e) {
//               this.setState({ text: `error: ${e.message}` });
//             }
//           }}
//         />
//       </View>
//     );
//   }
// }

function GameBot(props) {
  const [isStart, setIsStart] = useState(false);
  const [chatText, setChatText] = useState("");
  const [wordsArray, setWordsArray] = useState([
    { id: "2", movie: "Spiderman" },
  ]);

  const handleStartEvent = () => {
    var array = wordsArray;
    array.push({
      id: "1",
      movie: "batman",
    });
    // setWordsArray(wordsArray.concat({ id: "3", movie: "superman" }));
    console.log(wordsArray);
    setIsStart(true);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (chatText == "aquaman") {
      var array = wordsArray;
      array.push({
        id: "4",
        movie: chatText,
      });
      array.push({
        id: "3",
        movie: "narniya",
      });
      setWordsArray(array);
      console.log(wordsArray);
    }
  };

  const handleUserResponse = async () => {
    // const token = await AsyncStorage.getItem("token");
    // fetch(url + "/feeds/addfolder", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     folderName: folderName,
    //     folderDesc: folderDesc,
    //     folderTag: folderTag,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log("response", response);
    //     props.navigation.navigate("SelectPosts", response);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  const renderItem = ({ item }) => (
    <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
      <Text>{item.movie}</Text>
    </Card>
  );

  return (
    <View style={{ margin: 50 }}>
      {isStart ? (
        <View>
          <View>
            <TextInput
              value={chatText}
              label="Chat"
              style={{
                margin: 15,
                borderRadius: 5,
                borderColor: "lightblue",
                borderWidth: 1,
                padding: 5,
              }}
              placeholder="Enter something"
              theme={{ colors: { primary: "blue" } }}
              onChangeText={(text) => {
                setChatText(text);
              }}
            />
            <Button title="Submit" onPress={handleSubmitEvent} />
          </View>
          <View>
            <FlatList
              data={wordsArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      ) : (
        <Button title="Start" onPress={handleStartEvent} />
      )}
    </View>
  );
}

export default GameBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
});
