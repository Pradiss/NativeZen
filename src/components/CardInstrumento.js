
import React,{useState,useEffect} from "react"
import { View, Text, Image} from "react-native"

export default function CardInstrument({item}){

    
    
    return(
        <View style={{flexDirection:""}} >
           <View>
            {/* <Image
                source={{uri: item.foto}}
                style={{ width: 100, height: 100 }}
                resizeMode="cover"
            /> */}
                
            <Text>{item.nomeInstrumeto}</Text>
           </View>
        </View>
    )
}
