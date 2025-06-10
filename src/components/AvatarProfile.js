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
        <View style={{flexDirection:"row",paddingHorizontal:16, marginBlock:8, alignItems:"center", justifyContent:"space-between"}}>
            <View style={{flexDirection:"row"}} 
             >

            <Image
              
                source={{uri: users.foto}}
                style={{ width: 50, height: 50, borderRadius: 100, alignSelf: 'start' }}
                />
            <Text style={styles.title}   onPress={() => navigation.navigate("Profile")}> Hi, {users.nome}</Text>
            </View>

            <View>

                <MaterialCommunityIcons style={styles.icon} name="bell" size={20} color="#fff"
                onPress={() => navigation.navigate("Notification")}
                />
            </View>    
        </View>
    )
}