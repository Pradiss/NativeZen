
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert,ScrollView, TextInput , Keyboard, KeyboardAvoidingView, Platform} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button } from "react-native-paper"
import { SocialIcon } from "../components/RedeSocial"
import { formatPhone, formatReais } from "../utils/mask"
import { apiUsers } from "../service.js/Api"
import EditDescription from "../components/EditDescription"
import { cleanPhone } from "../utils/mask"


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
        
        const LoadingUsers = async () =>{
            try{
                const api = await AsyncStorage.getItem("api_token")
                const idUsuario = await AsyncStorage.getItem("idUsuario")
                const res = await apiUsers.get(`/${idUsuario}`,
                    {
                        headers:{
                            "Content-Type" : "application/json",
                            "Authorization" : `Bearer ${api}`
                        }
                    }
                )
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
<KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 , paddingHorizontal:16}}>
        <View style={{paddingTop:53, gap:8}}>

            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end"}}>
                <MaterialCommunityIcons  name="arrow-left" color="#000" size={24}  
                onPress={()=> navigation.navigate("Home")}
                />
                <MaterialCommunityIcons  name="cog" color="#000" size={24}  
                onPress={()=> navigation.navigate("Configuração")}
                />
            </View>

            <Image
                source={users.foto ? { uri: users.foto } : require("../asset/avatar.png")}
                style={{ 
                    width: "100%", 
                    height: 290, 
                    borderRadius: 50, 
                    alignSelf: "center", 
                    marginTop:22,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.16,
                    shadowRadius: 3,
                    elevation: 5
                }}
                resizeMode="cover"
                />

            <View style={{alignItems:"start", }}>
                
                <Text style={{fontSize:38, fontWeight:600, marginTop:16}}>{users.nome}  , {users.idade}</Text>

                <Text style={{fontSize:20,color:"#555555", fontWeight:400 ,marginTop:8}} >
                    <MaterialCommunityIcons style={{color:"#222222"}} name="google-maps" size={22} />{users.cidade}, {users.uf}
                </Text>
                <View style={{flexDirection:"row", marginTop:16, gap:32}}>
                    <Text style={{color:"#555555", fontSize:20, fontWeight:400}}>
                        <MaterialCommunityIcons name="music-circle" size={22} color="#000" >
                        </MaterialCommunityIcons>
                        {category(users.idCategoria)}
                    </Text>

                    <Text style={{fontSize:20,color:"#555555", fontWeight:400 ,marginBottom:8}}>
                        <MaterialCommunityIcons name="guitar-acoustic" size={22} color="#000">
                        </MaterialCommunityIcons>
                        {instrumento(users.idInstrumento)}
                    </Text>
                </View>
            </View>

            <View style={{paddingTop:16, gap:16}}>
                <Text style={{fontSize:28,fontWeight:700}}>{formatReais(users.preco)}</Text>
                <Button icon="chat-outline" mode="contained" 
                style={{backgroundColor:"black",
                    paddingVertical: 4, paddingHorizontal: 16, 
                    alignSelf: "center",  width: "100%"                    
                }}
                onPress={() => navigation.navigate("Chat")}
                >Envie uma mensagem</Button>
            </View>
               
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBlock: 32
                }}>
                <SocialIcon
                    platform="Instagram"
                    icon="instagram"
                    username={users.instagram}
                    urlScheme="instagram://user?username="
                    webBaseUrl="https://www.instagram.com/"
                />

                <SocialIcon
                    platform="Facebook"
                    icon="facebook"
                    username={users.facebook}
                    urlScheme="facebook://user?username="
                    webBaseUrl="https://www.facebook.com/"
                />

                <SocialIcon
                platform="WhatsApp"
                icon="whatsapp"
                username={users.whatsapp}
                urlScheme="whatsapp://send?phone="
                webBaseUrl={`https://wa.me/${cleanPhone(users.whatsapp)}`}
                />

            </View>

            <View style={{gap:16,}}>
                
                
                <EditDescription description={users.description}/>

            </View>
           

            <View style={{paddingTop:100}}></View>
        </View>
    </ScrollView>
    </KeyboardAvoidingView>
    )
}
