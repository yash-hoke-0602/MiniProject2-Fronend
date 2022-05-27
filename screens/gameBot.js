import React, { Component, useState } from "react";
import { View, StyleSheet, Button, Text, FlatList } from "react-native";
import * as Permissions from "expo-permissions";
import * as Constants from "expo-constants";
import { Audio } from "expo-av";
import uuid from "react-native-uuid";
import { url } from "../components/url";

import { Card, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [wordsArray, setWordsArray] = useState([]);
  const [mapObject, setMapObject] = useState({});
  const [prevMovie, setPrevMovie] = useState("");

  // const loadData = async () => {
  //   const initObject = {
  //     id: uuid.v4(),
  //     movie:"Batman"
  //   };

  // };

  // useEffect(() => {
  //   loadData();
  // });

  const handleStartEvent = async () => {
    const token = await AsyncStorage.getItem("token");

    fetch(url + "/bots/movieGameBot", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setMapObject(data.movieList);
        console.log(data);
      });

    const movieArray = mapObject;
    for (var item in movieArray) {
      setMapObject((prev) => ({ ...prev, [item]: false }));
    }

    setMapObject((prev) => ({ ...prev, tenet: true }));
    setWordsArray((prevState) => [...prevState, "tenet"]);
    setIsStart(true);
    setPrevMovie("tenet");
  };

  const handleResetEvent = (e) => {
    fetch(url + "/bots/destroyMovieGameBot", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        // setMapObject(data.movieList);
        console.log(data);
      });
  };

  const handleStopEvent = (e) => {
    setWordsArray([]);
    setPrevMovie("");
    setIsStart(false);
    const movieArr = mapObject;
    for (var item in movieArr) {
      setMapObject((prev) => ({ ...prev, [item]: false }));
    }
    fetch(url + "/bots/setMovieGameBot", {
      method: "POST",
      headers: new Headers({
        // Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        moviesList: mapObject,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // setMapObject(data.movieList);
        console.log(data);
      });
  };

  const handleSubmitEvent = (e) => {
    console.log("prev-" + prevMovie);
    var movieName = chatText;
    setChatText(movieName.toLowerCase());
    const lastChar = prevMovie.charAt(prevMovie.length - 1);
    const firstChar = chatText.charAt(0);
    console.log(lastChar + "-" + firstChar);

    if (lastChar === firstChar) {
      // const userObject = {
      //   movie: chatText,
      // };

      var currentMovie = "kjad";
      const lastNewChar = chatText.charAt(chatText.length - 1);
      const movieArray = mapObject;
      for (var item in movieArray) {
        console.log("A[0]=" + item.charAt(0) + lastNewChar + mapObject[item]);
        if (item.charAt(0) === lastNewChar && !mapObject[item]) {
          currentMovie = item;
          console.log(currentMovie);
        }
      }
      console.log(currentMovie);

      setWordsArray((prevState) => [...prevState, chatText]);

      setMapObject((prev) => ({ ...prev, [chatText]: true }));
      setPrevMovie(currentMovie);
      if (currentMovie !== "kjad") {
        // const responseObject = {
        //   movie: currentMovie,
        // };
        setWordsArray((prevState) => [...prevState, currentMovie]);
        setMapObject((prev) => ({ ...prev, [currentMovie]: true }));
      } else {
        const movieArr = mapObject;
        for (var item in movieArr) {
          var itemStr = "" + item;
          setMapObject((prev) => ({ ...prev, [itemStr]: false }));
          console.log("map-" + item);
        }
        console.log("END:-" + mapObject);

        fetch(url + "/bots/setMovieGameBot", {
          method: "POST",
          headers: new Headers({
            // Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            moviesList: mapObject,
          }),
        })
          .then((data) => data.json())
          .then((data) => {
            // setMapObject(data.movieList);
            console.log(data);
          });

        setWordsArray([]);
        setPrevMovie("");
        setIsStart(false);
      }
    }
    console.log(wordsArray);
    console.log(mapObject);
  };

  const renderItem = ({ item }) => (
    <Card style={{ backgroundColor: "#ffff", margin: 10 }}>
      <Text>{item}</Text>
    </Card>
  );

  return (
    <View style={{ margin: 50 }}>
      {isStart ? (
        <View>
          <View>
            <Button title="Stop" onPress={handleStopEvent} />
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
              placeholder="Enter movie name"
              theme={{ colors: { primary: "blue" } }}
              onChangeText={(text) => {
                setChatText(text);
              }}
            />
            <Button title="Submit" onPress={handleSubmitEvent} />
          </View>
          <View>
            <FlatList
              inverted={true}
              data={wordsArray}
              renderItem={renderItem}
              keyExtractor={(item) => uuid.v4() + item.movie}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={{ margin: 10 }}>
            <Button title="Start" onPress={handleStartEvent} />
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Reset" onPress={handleResetEvent} />
          </View>
        </View>
      )}
    </View>
  );
}

export default GameBot;
