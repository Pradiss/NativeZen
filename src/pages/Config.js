import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert ,Pressable} from "react-native"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Config({navigation}){
     


   const logout = async () => {
      try {
        await AsyncStorage.removeItem("idUsuario")
  
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
  
      } catch (e) {
        Alert.alert("Erro ao fazer logout", e.message)
      }
    }
  


    return(
        <View style={{padding:16}}>
           

            <Text style={{fontSize:18,fontWeight:600,marginBlock:8}}>Configurações de Conta</Text>
            <Pressable onPress={() => navigation.navigate("Editar Perfil")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="account-edit-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Editar Perfil </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Change Password")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="lock-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Mudar Senha</Text>
            </Pressable>

            <Text style={{fontSize:18,fontWeight:600,marginBlock:8}}>Mais</Text>

           {/* <Pressable onPress={() => navigation.navigate("Language")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="tooltip-text-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Language </Text>
            </Pressable> */}

            <Pressable onPress={() => navigation.navigate("Privacy")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="shield-alert-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Política de Privacidade </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Help")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="help-circle-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Suporte </Text>
            </Pressable>

            <Pressable onPress={logout}
            style={{borderRadius:18,
            width:"100%",
            height:55,
            paddingHorizontal:16,
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
            marginTop: 8,
            backgroundColor: "#f8f8f8",
            padding:8}}
            >
                <Text style={{color:"red", fontSize:16}}>Sair</Text>
            </Pressable>
        </View>
    )
}