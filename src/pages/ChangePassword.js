import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert, TextInput} from "react-native"
import styles from "../components/Style"


export default function ChangePassword({navigation}){

    const[senha, setSenha] = useState("")
   
    return(
         <View style={{padding:16}}>
            
            <TextInput 
            style={styles.inputLogin} 
            value={senha} 
            placeholder="Your Email" 
            placeholderTextColor="#ccc"  
            onChangeText={setSenha}/>

        </View>
    )
}