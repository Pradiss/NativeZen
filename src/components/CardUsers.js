import React,{useState,useEffect} from "react"
import { useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./Style";


export default function CardUsers({item, navigation}){
    

     const instrumento = (idInstrumento) =>{
        switch(idInstrumento){
            case 1: return "Violão";
            case 2: return "Bateria";
            case 3: return "Cavaco";
            case 4: return "Cantor(a)";
            case 5: return "Baixo";
        }
        
    }
    const category = (idCategoria) =>{
        switch(idCategoria){
            case 1: return "Samba";
            case 2: return "Sertanejo";
            case 3: return "Rock";
            case 4: return "Pagode";
            case 5: return "MPB";
            case 6: return "DJ";
        }
        
    }

    
    return(
        <View style={{flex:"1"}}>
            <TouchableOpacity  onPress={() => navigation.navigate("ProfileDetails",{idUsuario : item.idUsuario})}>
                <ImageBackground
                    source={{uri: item.foto}}
                    style={{ width: 270, height:300, borderRadius:40, marginEnd:16 , justifyContent:"flex-end"}}
                    resizeMode="cover"
                    imageStyle={{borderRadius:40}}
                    >
                    <View style={{padding:20, backgroundColor:"#000",borderRadius:30, justifyContent:"center", alignItem:"center"}}>
                        <Text style={{fontSize:22,color:"#fff", fontWeight:600 }}>{item.nome}</Text>
                        
                        <Text style={{color:"#fff", fontSize:16,marginBlock:4}}>
                                <MaterialCommunityIcons name="google-maps" size={20} color="#fff">
                                </MaterialCommunityIcons>
                                {item.cidade}
                            </Text>

                        <View style={{flexDirection:"row", gap:16}}>
                            <Text style={{color:"#fff", fontSize:16}}>
                                <MaterialCommunityIcons name="guitar-pick" size={20} color="#fff">
                                </MaterialCommunityIcons>
                                {category(item.idCategoria)}
                            </Text>
                            <Text style={{fontSize:14,color:"#fff", fontWeight:600 ,marginBottom:8}}>
                                <MaterialCommunityIcons name="guitar-acoustic" size={20} color="#fff">
                                </MaterialCommunityIcons>{instrumento(item.idInstrumento)}
                            </Text>
                        </View>
                        


                    </View>
                </ImageBackground>
            </TouchableOpacity>
            
        </View>
    )
}