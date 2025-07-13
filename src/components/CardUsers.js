
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
                <View style={styles.CardUser}>
                    <ImageBackground
                         source={item.foto ? { uri: item.foto } : require("../asset/avatar.png")}
                        style={{ 
                            padding:12,
                            width: 250,
                            height:280, 
                            borderRadius:30,
                            
                            }}
                        resizeMode="cover"
                        imageStyle={{borderRadius:30}}
                        >
                        
                    </ImageBackground>
                    <View style={{padding:16,gap:8,  justifyContent:"center", alignItem:"center"}}>
                            <Text style={{fontSize:22,color:"#232323", fontWeight:600 }}>{item.nome}</Text>
                            
                            <Text style={{color:"#232323", fontSize:18,marginBlock:4, }}>
                                    <MaterialCommunityIcons name="google-maps" size={25} color="#6BD2D7">
                                    </MaterialCommunityIcons>
                                    {item.cidade}
                                </Text>

                            <View style={{flexDirection:"row", gap:16, alignItems:"center", }}>
                                <Text style={{color:"#232323", fontSize:18,}}>
                                    <MaterialCommunityIcons name="music-circle" size={25} color="#6BD2D7">
                                    </MaterialCommunityIcons>
                                    {category(item.idCategoria)}
                                </Text>
                                <Text style={{fontSize:18,color:"#232323",  }}>
                                    <MaterialCommunityIcons name="guitar-acoustic" size={25} color="#6BD2D7">
                                    </MaterialCommunityIcons>{instrumento(item.idInstrumento)}
                                </Text>
                            </View>
                            


                        </View>
                </View>
            </TouchableOpacity>
            
        </View>
    )
}
