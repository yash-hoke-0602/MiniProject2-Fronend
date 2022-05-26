import React, { useState, useEffect } from "react";

import { Button, TextInput, View, Text, FlatList } from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../components/url";
import uuid from "react-native-uuid";

function UtilityBot(props) {
  const [chatText, setChatText] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatsArray, setChatsArray] = useState([]);

  // const loadData = async () => {
  //   const data = [
  //     {
  //       id: uuid.v4(),
  //       message: (
  //         <View>
  //           <Text>Welcome to Utility bot</Text>
  //         </View>
  //       ),
  //     },
  //   ];
  //   setChatsArray(data);
  // };

  // useEffect(() => {
  //   loadData();
  // }, [chatsArray]);

  const sendChat = async () => {
    // const chatObject = {
    //   id: uuid.v4(),
    //   message: <Text>{chatText}</Text>,
    // };

    // var newArray = chatsArray;

    // newArray.push(chatObject);

    // const token = await AsyncStorage.getItem("token");
    // setChatResponse("Cool");
    // console.log(chatResponse);
    // console.log("Start");
    // console.log(chatText);
    await fetch(url + "/bots/chatBot", {
      method: "POST",
      headers: new Headers({
        // Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        userResponse: "name",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.commandResponse);
        // setChatResponse("sett new val");
        // console.log(chatResponse);
        setChatResponse(data.commandResponse);
        console.log("HI" + chatResponse);
      });

    // switch (chatResponse) {
    //   case "name":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter name you want to change!</Text>,
    //     });
    //     break;
    //   case "prn":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter PRN that you want to change!</Text>,
    //     });
    //     break;
    //   case "branch":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter Branch that you want to change!</Text>,
    //     });
    //     break;

    //   case "year":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter Year that you want to change!</Text>,
    //     });
    //     break;

    //   case "address":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter Address that you want to change!</Text>,
    //     });
    //     break;

    //   case "internship":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: (
    //         <Text>
    //           Please Enter Internship details that you want to change!
    //         </Text>
    //       ),
    //     });
    //     break;

    //   case "pointer":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Please Enter Pointer that you want to change!</Text>,
    //     });
    //     break;

    //   case "achievement":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: (
    //         <Text>
    //           Please Enter Achievement details that you want to change!
    //         </Text>
    //       ),
    //     });
    //     break;

    //   case "placement":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: (
    //         <Text>Please Enter Placement details that you want to change!</Text>
    //       ),
    //     });
    //     break;
    //   case "none":
    //     newArray.push({
    //       id: uuid.v4(),
    //       message: <Text>Sorry, I can't understand!</Text>,
    //     });
    //   default:
    //     break;
    // }
    // setChatsArray(newArray);
    // setChatText("");
  };

  const renderItem = ({ item }) => (
    <Card style={{ backgroundColor: "#ffff", margin: 10 }}>{item.message}</Card>
  );

  return (
    <View>
      <Text style={{ padding: 50 }}>UtilityBot</Text>
      <View>
        <View>
          <TextInput
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
            onChangeText={(text) => setChatText(text)}
          />
        </View>
        <View style={{ width: 100 }}>
          <Button
            mode="contained"
            style={{
              marginLeft: 18,
              marginRight: 18,
              marginTop: 18,
            }}
            onPress={sendChat}
            title="Send"
          />
        </View>
      </View>
      <View>
        <FlatList
          data={chatsArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default UtilityBot;
