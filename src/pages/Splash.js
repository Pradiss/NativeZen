import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert } from "react-native"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash({navigation}){

  useEffect(() => {

    const check = async () => {
      try {
        const id = await AsyncStorage.getItem('idUsuario')
        // console.log('ID LIDO:', id)
        navigation.replace(id ? 'MainTabs' : 'Login')
      } catch {
        navigation.replace('Login')
      }
    }
    check()

      const timer = setTimeout(() => {navigation.replace('Login');}, 2400)
      return () => clearTimeout(timer)
      
    }, [navigation])
  
    return(
        <View style={styles.containerSplash}>
            <Image
            source={require('../asset/logoZene.png')}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
            />
            <View stlye={{alignItems:"center", marginTop:16}}>
                <ActivityIndicator animating={true} size={50} color="#6BD2D7"/>
                <Text style={{fontSize:18, color:"#fff", marginTop:16}}>Carregando...</Text>
            </View>
        </View>
    )
}
