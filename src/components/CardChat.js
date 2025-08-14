import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./Style";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { apiMessageReceive, apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarDataOuHora } from "../utils/mask";

export default function CardChat({ item, navigation }) {

  const [users,setUsers] = useState(null)
  const [iduser, setIdUser] = useState(null)

  const LoadingUsers = async () =>{
    try{
      
      const res = await apiUsers.get(`/${item.enviou_id}`)
      setUsers(res.data)
    }catch(e){
      Alert.alert("Erro ao carregar usuario", e.message)
    }
  }

  const loadUser = async () => {
      const id = await AsyncStorage.getItem("idUsuario")
      setIdUser(id)
  }
  
  useEffect(()=>{
    if(item?.enviou_id){
      loadUser()
      LoadingUsers()

    }
  },[item.enviou_id])

  
  return (
     <TouchableOpacity onPress={() => navigation.navigate("ScreenChat",{idMensagens : item.idMensagens})}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBlock: 16,
          gap: 12,
        }}>

        <Avatar.Image
          size={50}
          source={users?.foto ? { uri: users?.foto } : require("../asset/avatar.png")}
          style={{ alignSelf: "flex-start", backgroundColor: "#232323" }}
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {iduser && item.enviou_id === iduser ? "Você" : users?.nome  || "Usuario " }

          </Text>
          <Text style={{ color: "#000", fontSize: 14 }}>{item.texto.split(" ").slice(0, 5).join(" ")}</Text>
          
        </View>

        <View style={{flex:1, alignItems: "flex-end"  ,gap:8}}>
        
          <Text style={{ color: "#000", fontSize: 16 }}>{formatarDataOuHora(item.data_envio)}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />
    </TouchableOpacity>
  );
}
