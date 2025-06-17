import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert, TextInput} from "react-native"
import styles from "../components/Style"


export default function EditProfile({navigation}){

    const [email,setEmail] = useState("")
    const [nome, setNome] = useState("")
   
    return(
        <View style={{padding:16}}>
            <TextInput style={styles.inputLogin} value={email} placeholder="Your Email" placeholderTextColor="#ccc"  onChangeText={setEmail}/>
            <TextInput style={styles.inputLogin} value={nome} placeholder="Your Email" placeholderTextColor="#ccc"  onChangeText={setNome}/>

        </View>
    )
}