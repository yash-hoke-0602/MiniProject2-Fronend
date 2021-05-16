import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';

import axios from 'axios';
axios.defaults.withCredentials = true;

function SignUpModal(props) {

    const [userNameSU, onChangeUserNameSU] = React.useState(null);
    const [passwordSU, onChangePasswordSU] = React.useState(null);
    const [rePassword, onChangeRePassword] = React.useState(null);

    
    function onPressSignUp(){
        props.modalCall(false)
    }

    return (
        <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.modalText}
                        placeholder="Enter username"
                        onChangeText={onChangeUserNameSU}
                        value={userNameSU}
                    />
                    <TextInput
                    style={styles.modalText}
                    secureTextEntry = {true}
                    onChangeText={onChangePasswordSU}
                    value={passwordSU}
                    placeholder="Enter Password"
                    />
                
                    <TextInput
                    style={styles.modalText}
                    secureTextEntry = {true}
                    onChangeText={onChangeRePassword}
                    value={rePassword}
                    placeholder="Confirm Password"
                    />
        
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={onPressSignUp}
                    >
                        <Text style={styles.textStyle}>Sign Up</Text>
                    </Pressable>
                </View>
        </View>

    );
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
    },
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 45,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 10,
        height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin:10,
      height:50,
      width:150
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:20
    },
    modalText: {
      marginBottom: 15,
      fontSize:20,
      backgroundColor: "white",
      borderWidth : 1,
      padding: 15,
      borderRadius: 10,
      borderColor: "gold",
      backgroundColor:"gold",
      color: "white",
      fontWeight: "bold"
    }
  });

export default SignUpModal;