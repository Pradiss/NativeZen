import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert, TextInput} from "react-native"
import styles from "../components/Style"


export default function EditProfile({navigation}){

    const [email,setEmail] = useState("")

   
    return(
        <View style={{flex:2, alignItems:"center", justifyContent:"center"}}>
            <TextInput style={styles.inputLogin} value={email} placeholder="Your Email" placeholderTextColor="#ccc"  onChangeText={setEmail}   />

        </View>
    )
}