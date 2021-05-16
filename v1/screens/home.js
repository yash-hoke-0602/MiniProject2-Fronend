import axios from "axios";
import React, { useState, useEffect} from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { AuthContext } from '../components/context'
function Home(props) {

    const[isLogged,setIsLogged] = useState(false)

    const {signOut} = React.useContext(AuthContext)
    
    // useEffect(()=>{
    //     console.log('1')
    //     axios.get("http://192.168.43.170:5000/isLogin")
    //         .then((res)=>{
    //             console.log(res.data.loggedStatus)
    //             setIsLogged(res.data.loggedStatus)
    //         })
    // },[])

    return (
        <View style={{margin:50}}>
            <Text>Home {isLogged}</Text>
            <Pressable onPress={()=>signOut()}>
                <Text>LogOut</Text>
            </Pressable>
        </View>
    );
}

export default Home;