import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput ,ActivityIndicator} from "react-native";
import SignInModal from './signInModal';
import SignUpModal from "./signUpModal";
import axios from 'axios';
axios.defaults.withCredentials = true;


const Login = ({navigation}) => {
  

  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);


  
  
    return (
      <View style={styles.centeredView}>

  {/*     modal of signIn      */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={signInModalVisible}
          onRequestClose={() => {
            setSignInModalVisible(!signInModalVisible);
          }}
        >
              <SignInModal modalCall={setSignInModalVisible} nav={navigation}/>

        </Modal>

  {/*     modal of signUp      */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={signUpModalVisible}
          onRequestClose={() => {
            setSignUpModalVisible(!signUpModalVisible);
          }}
        >
          
              <SignUpModal modalCall={setSignUpModalVisible} />

        </Modal>



        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setSignInModalVisible(true)}
        >
              <Text style={styles.textStyle}>Sign In</Text>
        
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setSignUpModalVisible(true)}
        >
              <Text style={styles.textStyle}>Sign Up</Text>
        
        </Pressable>
      
      </View>
    );
        
};

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

export default Login;