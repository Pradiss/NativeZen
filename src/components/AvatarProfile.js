import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function AvatarProfiler({navigation}){
    
    const [users,setUsers] = useState([])
    const isFocused = useIsFocused()

   

    useEffect(() => {
        const authHeader = {
            headers: {
                Authorization: `Basic ${btoa('admin@example.com:password')}`,
                // Authorization: `Bearer ${token}`,
            },
        };
        const LoadingUsers = async () =>{
            try{
                const idUsuario = await AsyncStorage.getItem("idUsuario")
                const res = await axios.get(`https://erick5457.c44.integrator.host/api/usuarios/${idUsuario}`, authHeader)
                setUsers(res.data)
            }catch(error){
                Alert.alert("ERROR",error)
            }
            
        }

        
        if(isFocused)
            LoadingUsers()
           
    },[isFocused])


   
    
    return(
        <View style={{flexDirection:"row", justifyContent: "space-between"}}>
            <Avatar.Image size={24} source={{uri: users.foto}}/>
            <Text> Hi, </Text>
            
          
        </View>
    )
}