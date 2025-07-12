import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert, Pressable ,TouchableWithoutFeedback, Keyboard } from "react-native"
import { Button , IconButton} from "react-native-paper"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";

import { useRef } from "react";

export default function ScreenInicial({navigation}){

    
    
    return(
        <View style={styles.backgroundScreen}>
            <View>
                    
                <Image
                source={require('../asset/BackgroundScreen.png')}
                style={{ width: 350, height: 350, paddingTop:50, }}
                resizeMode="contain"
                    />
            </View>
            

            
            
           <View style={styles.backgroundScreenBlack}>
                          

                <Text style={{fontSize:38, color:"#fff", marginTop:16, fontWeight:600 , textAlign:"center"}}>
                    Bem vindo ao Zene
                    
                </Text>
                <Text style={{fontSize:18, color:"#c7c7c7", marginTop:16, fontWeight:400, textAlign:"center", marginBottom:36}}>
                   Cadastre e partipe com os diversos musicos e bandas da sua região
                </Text>
                
                    <Pressable style={{ 
                    borderRadius:30,
                    width:320,
                    height:55,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor: "#6BD2D7",
                    padding:8,
                    borderColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: { width: 2, height: 6 },
                    shadowOpacity: 0.15, 
                    shadowRadius: 3, 
                    elevation: 5,
                     }} onPress={()=> navigation.navigate("FormRegister")}>
                    <Text style={{fontSize:18}}>Criar uma conta<MaterialCommunityIcons name="arrow-right" size={20} color="#000" /> </Text>
                    
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

                <View style={{flexDirection:"row" ,paddingBottom:50,paddingTop:12}}>
                    <Text style={{color:"#fff",fontSize:14, marginTop:16, fontWeight:400}}>
                        Já tem uma conta?
                    </Text>
                    <Text 
                    style={{color:"#6BD2D7",fontSize:15, marginTop:16, fontWeight:400}} 
                    onPress={() => navigation.navigate("Login")}> Login</Text>
                </View>
                    <Image
                    source={require('../asset/logoZene.png')}
                    style={{ width: 90, height: 40 }}
                    resizeMode="contain"
                        />  
           </View>
        </View>
    )
}