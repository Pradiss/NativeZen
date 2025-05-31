import React,{useState,useEffect} from "react"
import { View, Text, Image, Alert, TouchableOpacity} from "react-native"
import styles from "./Style"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardUsersList({item, navigation}){


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
    <TouchableOpacity >

        <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"#fff", borderRadius:30, marginBlock:8, padding:6, marginHorizontal:8}}>
            <Image
                source={{uri: item.foto}}
                style={{ width: 100, height:100, borderRadius:22}}
                resizeMode="cover"
                
            />
            <View style={{padding:16 , justifyContent:"center", flexDirection:"row",alignContent:"flex-end"}}>
                <View>
                    <Text style={styles.titleName}>{item.nome}</Text>
                    <Text style={styles.textEndress}><MaterialCommunityIcons  name="google-maps" size={20} />{item.cidade}</Text>
                    
                    <View style={{flexDirection:"row" }}>
                        <Text style={styles.textEndress}>
                            <MaterialCommunityIcons name="guitar-pick" size={20} color="#000">
                            </MaterialCommunityIcons>{category(item.idCategoria)}
                        </Text>
                        <Text style={styles.textEndress}>
                            <MaterialCommunityIcons name="guitar-acoustic" size={20} color="#000">
                            </MaterialCommunityIcons>{instrumento(item.idInstrumento)}
                        </Text>

                    </View>
                </View>
                
            </View> 
                
                <View style={{flex:1, alignItems:"flex-end",padding:4,marginTop:70}}>
                    <MaterialCommunityIcons 
                    style={{ backgroundColor:"#6BD2D7", borderRadius:30, padding:3}}
                    name="arrow-top-right"
                     size={15} color="#000"  
                     onPress={() => navigation.navigate("ProfileView", {item})}/>
                </View>

        </View>
       </TouchableOpacity>
        
    )
}