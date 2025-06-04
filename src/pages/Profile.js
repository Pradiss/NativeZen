import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Profile({navigation}){

    
    const [users,setUsers] = useState([])
    const [category,setCategory] = useState([])
    const isFocused = useIsFocused()

    
   
    

    const LoadingCategory = async () =>{
        try{ 
            const res = await axios.get("https://erick5457.c44.integrator.host/api/categorias")
            setCategory(res.data)

        }catch(error){
            Alert.alert("ERROR",error.message)
        }
        
    }

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
            LoadingCategory()
    },[isFocused])
    
    return(
        <View style={styles.SpaceTop}>
            <Image
                source={{uri: users.foto}}
                style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
                />
                <View style={{alignItems:"center" }}>

                    <Text style={styles.title}>{users.nome}</Text>
                </View>
        </View>
    )
}4