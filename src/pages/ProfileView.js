
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert, Pressable, ScrollView } from "react-native"
import { useIsFocused , useRoute} from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "react-native-paper"
import { SocialIcon } from "../components/RedeSocial"
import { formatReais } from "../utils/mask";

export default function ProfileView({navigation}){

    
    const [users,setUsers] = useState([])
    const [categoria,setCategory] = useState([])
    const isFocused = useIsFocused()
     const route = useRoute();
     const { idUsuario } = route.params; 
    
   
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
    

    useEffect(() => {
        const authHeader = {
            headers: {
                Authorization: `Basic ${btoa('admin@example.com:password')}`,
                // Authorization: `Bearer ${token}`,
            },
        };
        const LoadingUsers = async () =>{
            try{
               
                const res = await axios.get(`https://erick5457.c44.integrator.host/api/usuarios/${idUsuario}`, authHeader)
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

        
        if(isFocused)
            LoadingUsers()
            LoadingCategory()
    },[isFocused])
    
    return(
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 , paddingHorizontal:16}}>
        <View style={{paddingTop:50}}>
            <View style={{ alignItems:"flex-start",paddingHorizontal:16}}>
                    <MaterialCommunityIcons  name="arrow-left" color="#000" size={24}  
                    onPress={()=> navigation.navigate("MainTabs" , {screen : "Home"})}
                    />
                            
            </View>

            <Image
                source={users.foto ? { uri: users.foto } : require("../asset/avatar.png")}
                style={{ width: "100%", height: 290, borderRadius: 50, alignSelf: "center", marginTop: 16 }}
                resizeMode="cover"
                />

            <View style={{alignItems:"start", }}>
                
                <Text style={{fontSize:38, fontWeight:600, marginTop:16}}>{users.nome}  , {users.idade}</Text>

                <Text style={{fontSize:20,color:"#555555", fontWeight:400 ,marginTop:8}} >
                    <MaterialCommunityIcons style={{color:"#222222"}} name="google-maps" size={22} />{users.cidade} , {users.uf}
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

            <View style={{paddingTop:8, gap:16}}>
                <Text style={{fontSize:28,fontWeight:700}}>{formatReais(users.preco)}</Text>
                <Button icon="chat-outline" mode="contained" 
                style={{backgroundColor:"black"}}
                onPress={() => navigation.navigate("MainTabs" , {screen : "Chat"})}
                >Envie uma mensagem</Button>
            </View>
               
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginBlock: 16
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
                    webBaseUrl="https://wa.me/"
                />
            </View>


            <View style={{paddingTop:8, gap:16}}>

                <Text style={{fontSize:20,fontWeight:600}}>Descrição</Text>
                <Text  style={{fontSize:16}}>{users.descricao}</Text>
            </View>
           
        </View>
    </ScrollView>
    )
}
