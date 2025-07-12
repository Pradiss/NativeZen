import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert, TextInput, Button, Pressable} from "react-native"
import styles from "../components/Style"


export default function ChangePassword({navigation}){

    const[senha, setSenha] = useState("")
   
    return(
         <View style={{padding:16}}>
            

            <Text>Coloque sua senha nova</Text>
            <TextInput 
            style={styles.inputLogin} 
            value={senha} 
            placeholder="Your Email" 
            placeholderTextColor="#ccc"  
            onChangeText={setSenha}/>
            <Text> Confirme sua senha </Text>
            <TextInput 
            style={styles.inputLogin} 
            value={senha} 
            placeholder="Your Email" 
            placeholderTextColor="#ccc"  
            onChangeText={setSenha}/>

            <Pressable style={styles.buttonLogin}>
                <Text>Redefinir</Text>
            </Pressable>

        </View>
    )
}