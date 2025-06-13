import React, { useState, useEffect} from "react"
import { View, Text, FlatList, Alert ,Pressable} from "react-native"
import styles from "../components/Style"


export default function Config({navigation}){


   
    return(
        <View style={{flex:2, alignItems:"center", justifyContent:"center"}}>

           
             <Pressable onPress={() => navigation.navigate("EditProfile")} 
            style={styles.buttonLogin}
                >
                <Text>Editar Perfil</Text>
            </Pressable>
             <Pressable onPress={() => navigation.navigate("Login")} 
            style={styles.buttonLogin}
                >
                <Text>Logout</Text>
            </Pressable>
        </View>
    )
}