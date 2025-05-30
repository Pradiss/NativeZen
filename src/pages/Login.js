import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert } from "react-native"




export default function Login({}){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")



    return(
        <View>
            <View>
                
                <TextInput value={email} placeholder="Your Email" onChangeText={setEmail}   />
                <TextInput value={password} placeholder="Your Password" onChangeText={setPassword}   />

            </View>
            <View>


            </View>
        </View>
    )
}
