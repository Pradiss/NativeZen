import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Button , IconButton} from "react-native-paper"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Register({navigation}){

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[usuario, setUsuario] = useState("")


    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerLogin}>
            
            <Image
            source={require('../asset/logoZene.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
                />
            <Text style={{fontSize:24, color:"#fff", marginTop:16, fontWeight:500, marginBlock:22}}>
                Resgiter to Zen
            </Text>
            
            
                
                <TextInput style={styles.inputLogin} value={email} placeholder="Your Email" onChangeText={setEmail}   />
                <TextInput style={styles.inputLogin} value={usuario} placeholder="Your Usuario" onChangeText={setUsuario}   />
                <TextInput 
                style={styles.inputLogin}
                value={password} 
                placeholder="Your Password" 
                secureTextEntry={true} // hide password 
                onChangeText={setPassword}   />

            
            
           <Pressable style={styles.buttonLogin} onPress={()=> navigation.navigate("MainTabs")}>
             <Text style={{fontSize:18}}> Register <MaterialCommunityIcons name="arrow-right" size={20} color="#000" /> </Text>
             
            
           </Pressable>

           

           
            

            <Text  
            style={{color:"#fff", fontSize:19, marginTop:140}}onPress={() => navigation.navigate("Login")}>
               <MaterialCommunityIcons color="#fff" name ="arrow-left" size={17}/> Back
            </Text>
        </View>
    </TouchableWithoutFeedback>
    )
}
