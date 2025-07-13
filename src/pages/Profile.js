
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert, Pressable,Linking ,ScrollView} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Profile({navigation}){

    const [users,setUsers] = useState([])
    const [categoria,setCategory] = useState([])
    const isFocused = useIsFocused()

    
   
    const instrumento = (idInstrumento) =>{
        switch(idInstrumento){
            case 1: return "Violão";
            case 2: return "Bateria";
            case 3: return "Cavaco";
            case 4: return "Cantor(a)";
           case 5: return "Baixo";
        }
        
    }
    const category = (idCategoria) =>{
        switch(idCategoria){
            case 1: return "Samba";
            case 2: return "Sertanejo";
            case 3: return "Rock";
            case 4: return "Pagode";
            case 5: return "MPB";
            case 6: return "DJ";
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

    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 , paddingHorizontal:16}}>
        <View style={{paddingTop:60}}>

            <View style={{alignItems:"flex-end",paddingHorizontal:16}}>
                <MaterialCommunityIcons  name="cog" color="#000" size={24}  
                onPress={()=> navigation.navigate("Configuração")}
                />
            </View>

            <Image
                source={users.foto ? { uri: users.foto } : require("../asset/avatar.png")}
                style={{ width: "100%", height: 290, borderRadius: 60, alignSelf: "center", marginTop: 16 }}
                resizeMode="cover"
                />

            <View style={{alignItems:"start", }}>
                
                <Text style={{fontSize:28, fontWeight:600, marginTop:16}}>{users.nome}  , {users.idade}</Text>

                <View style={{flexDirection:"row", marginTop:8, gap:16}}>
                    <Text style={{color:"#222222", fontSize:16, fontWeight:400}}>
                        <MaterialCommunityIcons name="music-circle" size={25} color="#000">
                        </MaterialCommunityIcons>
                        {category(users.idCategoria)}
                    </Text>

                    <Text style={{fontSize:16,color:"#222222", fontWeight:400 ,marginBottom:8}}>
                        <MaterialCommunityIcons name="guitar-acoustic" size={25} color="#000">
                        </MaterialCommunityIcons>
                        {instrumento(users.idInstrumento)}
                    </Text>
                </View>
                

                <Text style={{fontSize:14,color:"#444444", fontWeight:400 ,marginBottom:8}} >
                    <MaterialCommunityIcons style={{color:"#888888"}} name="google-maps" size={20} />{users.cidade} {users.uf}
                </Text>

                <Pressable style={styles.button} onPress={() => navigation.navigate("MainTabs", {screen: "Chat"})}>
                    <Text style={{color:"#fff", fontWeight:500, fontSize:16}}>Chat</Text>
                </Pressable>

            </View>

               
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:24, marginTop:30}}>

                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                    <MaterialCommunityIcons  name="instagram" color="#000" size={28}
                    onPress={() => {
                        const username = users.instagram
                        const appUrl = `instagram://user?username=${username}`
                        const webUrl = `https://www.instagram.com/${username}`

                       
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl)
                            } else {
                                Linking.openURL(webUrl)
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o perfil do Instagram.')
                            })
                        }}
                       style={{padding:8, backgroundColor:"#e9e9e9", borderRadius:50}}
                   />
                    <Text >{users.instagram}</Text>
                </View>
                
               
                
                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                 <MaterialCommunityIcons  name="facebook" color="#000" size={28}
                 onPress={() => {
                        const username = users.facebook
                        const appUrl = `facebook://user?username=${username}`
                        const webUrl = `https://www.facebook.com/${username}`

                        
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl)
                            } else {
                                Linking.openURL(webUrl)
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o perfil do Facebook.');
                            })
                        }}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/>
                   <Text>{users.facebook}</Text>
                </View>

                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                    <MaterialCommunityIcons  name="whatsapp" color="#000" size={28}
                     onPress={() => {
                        const username = users.whatsapp
                        const appUrl = `whatsapp://send?phone=${username}`
                        const webUrl = `https://wa.me/${username}`

                     
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl)
                            } else {
                                Linking.openURL(webUrl)
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o do WhatsApp.')
                            })
                        }}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/>
                  <Text>{users.whatsapp}</Text>
                </View>

                {/* <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                    <MaterialCommunityIcons  name="youtube" color="#000" size={28}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/>
                  <Text>{users.youtube}</Text>
                  </View> */}
            </View>

            
            <View style={{padding:32, marginTop:16, backgroundColor:"#e8e8e8",borderRadius:16}}>
                <Text style={styles.titleName}>Sobre </Text>
                <Text style={{marginBlock:8}}>{users.descricao}</Text>
            </View>
           
        </View>
    </ScrollView>
    )
}
