import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert ,Pressable} from "react-native"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function Config({navigation}){
     


   const handleLogout = async () => {
    await AsyncStorage.removeItem("idUsuario");
    navigation.replace('Login');
    };

    return(
        <View style={{padding:16}}>
           

            <Text style={{fontSize:18,fontWeight:600,marginBlock:8}}>Account Settings</Text>
            <Pressable onPress={() => navigation.navigate("EditProfile")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="lock-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Edit Profile </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Change Password")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="account-circle-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Change Password </Text>
            </Pressable>

            <Text style={{fontSize:18,fontWeight:600,marginBlock:8}}>More</Text>

           <Pressable onPress={() => navigation.navigate("Language")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="tooltip-text-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Language </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Privacy")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="shield-alert-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Privacy </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Help")} style={styles.buttonConfig}>
               <MaterialCommunityIcons color="#000" name ="help-circle-outline" size={17}></MaterialCommunityIcons> 
               <Text style={styles.textButtonConfig}>Help </Text>
            </Pressable>

            <Pressable onPress={handleLogout}
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
                <Text style={{color:"red", fontSize:16}}>Logout</Text>
            </Pressable>
        </View>
    )
}