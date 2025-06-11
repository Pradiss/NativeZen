import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"

export default function ProfileView({navigation, item}){

    const [users,setUsers] = useState([0])
    const [category,setCategory] = useState([])
    const isFocused = useIsFocused()

    

    const LoadingUsers = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
            setUsers(res.data)

        }catch(error){
            Alert.alert("ERROR",error)
        }
        
    }

    const LoadingCategory = async () =>{
        try{ 
            const res = await axios.get("https://erick5457.c44.integrator.host/api/categorias")
            setCategory(res.data)

        }catch(error){
            Alert.alert("ERROR",error.message)
        }
        
    }

    useEffect(() => {
        if(isFocused)
            LoadingUsers()
            LoadingCategory()
    },[isFocused])
    
    return(
        <View style={styles.SpaceTop}>
            <Image
                source={{uri: users[0].foto}}
                style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
                />
                <View style={{alignItems:"center" }}>

                    <Text style={styles.title}>{users[0].nome}</Text>
                </View>
        </View>
    )
}