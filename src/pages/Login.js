import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert, Pressable ,TouchableWithoutFeedback, Keyboard } from "react-native"
import { Button , IconButton} from "react-native-paper"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";

import { useRef } from "react";

export default function Login({navigation}){

    const[email, setEmail] = useState("")
    const[senha, setSenha] = useState("")
    const senhaInputRef = useRef();

    const { control, formState: { errors } } = useForm();
    
    
    const handleLogin = async () =>{
      try {
        const res = await axios.post('https://erick5457.c44.integrator.host/api/login',
        { email, senha }, { headers:{ 'Content-Type': 'application/json'}})

        const idUsuario = res.data?.usuario?.idUsuario
        
        await AsyncStorage.setItem('idUsuario', idUsuario.toString())

        // reset
            navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
            })
        } catch (error) {
            Alert.alert('Falha no login', error)
        }
    }

    return(
        <View style={styles.containerLogin}>
            
            <Image
            source={require('../asset/logoZene.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
                />
            <Text style={{fontSize:24, color:"#fff", marginTop:16, fontWeight:500, marginBlock:22}}>
                Welcome to Zen 
            </Text>
            
            
            <TextInput 
            style={styles.inputLogin} 
            value={email} 
            placeholder="Your Email" 
            placeholderTextColor="#ccc"  
            onChangeText={setEmail} 
            returnKeyType="next"
            onSubmitEditing={() => senhaInputRef.current?.focus()}  
            />

            <TextInput 
                placeholderTextColor="#ccc"
                style={styles.inputLogin}
                value={senha} 
                placeholder="Your Password" 
                secureTextEntry={true} // hide password 
                onChangeText={setSenha}  
                onSubmitEditing={handleLogin} 
            />
        
            
           <Pressable style={styles.buttonLogin} onPress={handleLogin}>
             <Text style={{fontSize:18}}> Get started <MaterialCommunityIcons name="arrow-right" size={20} color="#000" /> </Text>
             
           </Pressable>

            {/* <Text style={{color:"#fff",fontSize:14, marginTop:40, fontWeight:500}}>
                Or continue with</Text>


            <Button
            icon={() => (<MaterialCommunityIcons name="google" size={20} color="#fff" />)}
            mode="contained"
            style={{
                borderRadius:30,
                width:"100%",
                marginTop: 16,
                backgroundColor: "#000",
                borderWidth: 0.50,
                padding:8,
                borderColor: "#fff"
            }}
            textColor="#fff"
            >
            Login with Google
            </Button> */}

            <View style={{flexDirection:"row"}}>
                <Text style={{color:"#fff",fontSize:14, marginTop:16, fontWeight:400}}>
                    Don't have an account?
                </Text>
                 <Text 
                 style={{color:"#6BD2D7",fontSize:15, marginTop:16, fontWeight:400}} 
                 onPress={() => navigation.navigate("FormStepOne")}>{' '}
          Register here!</Text>
            </View>
            

             
            {/* <Text  
            style={{color:"#fff", fontSize:19}}onPress={() => navigation.navigate("MainTabs")}>
                Skip <MaterialCommunityIcons color="#fff" name ="arrow-right" size={17}/>
            </Text> */}
        </View>
 
    )
}