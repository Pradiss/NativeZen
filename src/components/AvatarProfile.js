
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert, TouchableOpacity } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import { Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRoute } from '@react-navigation/native';

export default function Profile({navigation,item}){
    
    const [users,setUsers] = useState([])
    const [categoria,setCategory] = useState([])
    const isFocused = useIsFocused()


    const route = useRoute();
    const { idUsuario } = route.params ?? {};

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
    <View style={{flexDirection:"row",paddingHorizontal:14,marginBlock:8, alignItems:"center", justifyContent:"space-between" }}>
           
       <TouchableOpacity onPress={() => navigation.navigate("Profile",{idUsuario: item.idUsuario})}>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
                <Avatar.Image 
                size={50} 
                source={{ uri: users.foto }} 
                style={{ alignSelf: 'flex-start' }}     
                />
                <View style={{justifyContent:"center", padding:8}}>
                     <Text>Welcome</Text>
                    <Text  style={{fontSize: 16, fontWeight: 'bold'}} onPress={() => navigation.navigate("Profile")}> Hi, {users.nome}</Text>
                </View>
        </View>
        </TouchableOpacity>
       

        <MaterialCommunityIcons style={styles.icon} name="bell" size={24} color="#fff"
        onPress={() => navigation.navigate("Notification")}
        />
          
    </View>
    )
}
