import React,{useState,useEffect} from "react"

import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <TouchableOpacity  onPress={() => navigation.navigate("profiledetails", { item: item })}>
                <ImageBackground
                    source={{uri: item.foto}}
                    style={{ width: 270, height:300, borderRadius:40, marginEnd:16 }}
                    resizeMode="cover"
                    imageStyle={{borderRadius:40}}
                    >
            

                <View style={{marginTop:220,padding:20, backgroundColor:"#fff",borderRadius:18, justifyContent:"center", alignItem:"center"}}>
                    <Text>{item.nome}</Text>
                    

                </View>
                </ImageBackground>
            </TouchableOpacity>
            
        </View>
    )
}