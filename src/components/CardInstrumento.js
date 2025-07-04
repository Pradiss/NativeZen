

import React,{useState,useEffect} from "react"
import { View, Text, Image, TouchableOpacity} from "react-native"

export default function CardInstrument({item}){

    
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Explore", {instrumento: item})}>
            <View>
                <View style={{flex:1, alignItems:"center"}}>
                   <Image
                        source={require('../asset/instrumento.jpg')}
                       style={{ width: 80, height: 80 , borderRadius:28, marginEnd:8, marginBottom:8}}
                       resizeMode="cover"
                   />
                       
                   <Text>{item.nomeInstrumento}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
