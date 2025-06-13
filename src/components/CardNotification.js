
import React,{useState,useEffect} from "react"
import { View, Text, Image, TouchableOpacity} from "react-native"
import styles from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CardNotification({item ,navigation}){


    
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Category")}>
       <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#fff", borderRadius:30, marginBlock:4, padding:6, marginHorizontal:8}}>
            <Image
                source={{uri: item.foto}}
                style={{ width: 70, height:70, borderRadius:22}}
                resizeMode="cover"
                
            />
            <View style={{padding:10 , justifyContent:"center", flexDirection:"row"}}>
                <View>
                    <Text style={styles.titleName}>{item.nome}</Text>
                    <Text style={styles.textEndress}><MaterialCommunityIcons  name="google-maps" size={20} />{item.cidade}</Text>
                    
                    <View style={{flexDirection:"row" }}>
                        

                    </View>
                </View>
                
            </View> 

        </View>
        </TouchableOpacity>
    )
}
