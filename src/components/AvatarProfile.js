
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert, TouchableOpacity } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute } from '@react-navigation/native';
import { apiUsers } from "../service.js/Api";

export default function Profile({navigation,item}){
    
    const [users,setUsers] = useState([])
    const [categoria,setCategory] = useState([])
    const isFocused = useIsFocused()


    useEffect(() => {
       
        const LoadingUsers = async () =>{
            try{
                
                const idUsuario = await AsyncStorage.getItem("idUsuario")
                const api = await AsyncStorage.getItem("token")
                const res = await apiUsers.get(
                    `/${idUsuario}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${api}`
                        }
                    }
                )
                setUsers(res.data)
            }catch(error){
                Alert.alert("ERROR",error)
            }
            
        }
   
        if(isFocused)
            LoadingUsers()  
    },[isFocused])
    
    return(
    <View style={{flexDirection:"row",
        paddingHorizontal:14,
        marginBlock:4, 
        alignItems:"center", 
        justifyContent:"space-between" }}>
           
       <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Avatar.Image 
                size={50} 
                source={users.fotoUrl ? { uri: users.fotoUrl } : require("../asset/avatar.png")}
                style={{ alignSelf: 'flex-start' }}     
                />
                <View style={{justifyContent:"center", padding:8}}>
                     <Text>Bem Vindo !!</Text>
                    <Text  style={{fontSize: 16, fontWeight: 'bold'}} onPress={() => navigation.navigate("Profile")}> Hi, {users.nome}</Text>
                </View>
        </View>
        </TouchableOpacity>
{/*        
        <MaterialCommunityIcons style={styles.icon} name="bell" size={24} color="#fff"
        onPress={() => navigation.navigate("Notification")}
        /> */}
          
    </View>
    )
}
