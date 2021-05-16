import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Pressable, Text} from 'react-native';
import {AuthContext} from '../components/context';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignInModal(props) {
    
    const [userNameSI, onChangeUserNameSI] = React.useState(null);
    const [passwordSI, onChangePasswordSI] = React.useState(null);

    // use signIn function from context
  const {signIn} = React.useContext(AuthContext)

    function onPressSignIn(){

        console.log(userNameSI)
        
        const data={
          user:userNameSI,
          password:passwordSI
        }
        signIn()
        // axios.post('http://192.168.43.170:5000/login',data)
        // .then(function (response){
        //   console.log("Done")
        // })
        props.modalCall(false)
        props.nav.navigate('Home');
        
    }


    return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
              style={styles.modalText}
              placeholder="Enter username"
              onChangeText={onChangeUserNameSI}
              value={userNameSI}
            />

          <TextInput
            style={styles.modalText}
            secureTextEntry = {true}
            onChangeText={onChangePasswordSI}
            value={passwordSI}
            placeholder="Enter Password"
          />
  
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onPressSignIn}
            >
              <Text style={styles.textStyle}>Sign In</Text>
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

export default SignInModal;


