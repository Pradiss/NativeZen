
import React,{useState,useEffect} from "react"

import { View, Text, Image } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Avatar } from "react-native-paper"

export default function AvatarProfile(){


    const [search,setSearch] = useState("")
    const [users,setUsers] = useState([])
    const isFocused = useIsFocused()

    const LoadingUsers = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
            setUsers(res.data[1])

        }catch(error){
            Alert.alert("ERROR",error)
        }
        
    }
    
        useEffect(() => {
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
