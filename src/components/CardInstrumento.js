
import React,{useState,useEffect} from "react"
import { View, Text, Image} from "react-native"

export default function CardInstrument({item}){

    
    
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Category")}>
            <View>
                <View style={{flex:1, alignItems:"center"}}>
                   <Image
                       source={{uri: item.foto}}
                       style={{ width: 80, height: 80 , borderRadius:28, marginEnd:8, marginBottom:8}}
                       resizeMode="cover"
                   />
                       
                   <Text>{item.generoMusical}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
