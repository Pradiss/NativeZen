import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Button , IconButton} from "react-native-paper"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios";

export default function Register({navigation}){

    const[email, setEmail] = useState("")
    const[senha, setSenha] = useState("")
    const[nome, setNome] = useState("")

  
    const handleRegister = async (e) => {
        e.preventDefault()

        try{
            const res = await axios.post("https://erick5457.c44.integrator.host/api/register",
                {
                    nome,
                    email,
                    senha,
                },
                {
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
                
            )
            
            navigation.navigate("Login")
        // reset
            navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
            })
        }catch(error){
            Alert.alert("ERRO ao Fazer cadastro", error.res?.data.message)
        }
    }



    return(
    
        <View style={[styles.containerLogin]}>
            
            <Image
            source={require('../asset/logoZene.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
                />
            <Text style={{fontSize:24, color:"#fff", marginTop:16, fontWeight:500, marginBlock:22}}>
                Cadastre-se na Zene
            </Text>
            
            
                
                <TextInput style={styles.inputLogin} value={nome} placeholder="Seu Nome" placeholderTextColor="#ccc" onChangeText={setNome}   />
                <TextInput style={styles.inputLogin} value={email} placeholder="Seu E-mail" placeholderTextColor="#ccc" onChangeText={setEmail}   />
                <TextInput 
                style={styles.inputLogin}
                value={senha}
                placeholderTextColor="#ccc" 
                placeholder="Sua Senha" 
                secureTextEntry={true} // hide password 
                onChangeText={setSenha}   />

            
            
           <Pressable style={styles.buttonLogin} onPress={handleRegister}>
             <Text style={{fontSize:18}}>Cadastrar<MaterialCommunityIcons name="arrow-right" size={20} color="#000" /> </Text>
             
            
           </Pressable>

           

           
            

            <Text  
            style={{color:"#fff", fontSize:19, marginTop:60}}onPress={() => navigation.navigate("Login")}>
               <MaterialCommunityIcons color="#fff" name ="arrow-left" size={17}/> Back
            </Text>
        </View>
  
    )
}