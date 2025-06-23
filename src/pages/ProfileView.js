
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert, Pressable } from "react-native"
import { useIsFocused , useRoute} from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
        <View style={styles.SpaceTop}>
            <Image
                source={{uri: users.foto}}
                style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
                />
                <View style={{alignItems:"flex-end",paddingHorizontal:16}}>
            </View>

            <View style={{alignItems:"center"}}>
                
                <Text style={{fontSize:28, fontWeight:600, marginTop:16}}>{users.nome}  {users.idade}</Text>

                <View style={{flexDirection:"row", marginBlock:4, gap:16}}>
                    <Text style={{color:"#000", fontSize:16 ,fontWeight:400}}>
                        <MaterialCommunityIcons name="guitar-pick" size={20} color="#000">
                        </MaterialCommunityIcons>
                        {category(users.idCategoria)}
                    </Text>
                
                    <Text style={{fontSize:16,color:"#000", fontWeight:400 ,marginBottom:8}}>
                        <MaterialCommunityIcons name="guitar-acoustic" size={20} color="#000">
                        </MaterialCommunityIcons>
                         {instrumento(users.idInstrumento)}
                    </Text>
                </View>

                <Text style={styles.textEndress}><MaterialCommunityIcons  name="google-maps" size={20} />{users.cidade} {users.uf}</Text>

                <Pressable style={styles.button} onPress={()=> navigation.navigate("MainTabs",{screen: "Chat"})}>
                    <Text style={{color:"#fff", fontWeight:500, fontSize:16}}>Chat</Text>
                </Pressable>

            </View>

            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:12, marginTop:30}}>
                
                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                    <MaterialCommunityIcons  name="instagram" color="#000" size={28}
                    onPress={() => {
                        const username = users.instagram;
                        const appUrl = `instagram://user?username=${username}`;
                        const webUrl = `https://www.instagram.com/${username}`;

                       
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl); 
                            } else {
                                Linking.openURL(webUrl); 
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o perfil do Instagram.');
                            });
                        }}
                       style={{padding:8, backgroundColor:"#e9e9e9", borderRadius:50}}
                   />
                    <Text >{users.instagram}</Text>
                </View>
                
               
                
                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                 <MaterialCommunityIcons  name="facebook" color="#000" size={28}
                 onPress={() => {
                        const username = users.facebook;
                        const appUrl = `facebook://user?username=${username}`;
                        const webUrl = `https://www.facebook.com/${username}`;

                        
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl); 
                            } else {
                                Linking.openURL(webUrl); 
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o perfil do Facebook.');
                            });
                        }}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/>
                   <Text>{users.facebook}</Text>
                </View>

                <View style={{flexDirection:"column", alignItems:"center", gap:8}}>
                    <MaterialCommunityIcons  name="whatsapp" color="#000" size={28}
                     onPress={() => {
                        const username = users.whatsapp;
                        const appUrl = `whatsapp://send?phone=${username}`;
                        const webUrl = `https://wa.me/${username}`;

                     
                        Linking.canOpenURL(appUrl)
                            .then((supported) => {
                            if (supported) {
                                Linking.openURL(appUrl); 
                            } else {
                                Linking.openURL(webUrl); 
                            }
                            })
                            .catch(() => {
                            Alert.alert('Erro', 'Não foi possível abrir o do WhatsApp.');
                            });
                        }}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/>
                  <Text >{users.whatsapp}</Text>
                </View>

                 {/* <MaterialCommunityIcons  name="youtube" color="#000" size={28}
                  style={{padding:12, backgroundColor:"#e9e9e9", borderRadius:50}}/> */}
            </View>

            
            <View style={{padding:32, marginTop:16, backgroundColor:"#e8e8e8",borderRadius:16}}>
                <Text style={styles.titleName}>About</Text>
                <Text style={{marginBlock:8}}>{users.descricao}</Text>
            </View>
                
        </View>
    )
}
