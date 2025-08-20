import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { SocialIcon } from "../components/RedeSocial";
import { formatReais } from "../utils/mask";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileView({ navigation }) {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const route = useRoute();
  const { idUser } = route.params;

  const instrumento = (idInstrumento) => {
  switch(idInstrumento){
    case 1: return "Violão";
    case 2: return "Bateria";
    case 3: return "Cavaco";
    case 4: return "Cantor(a)";
    case 5: return "Contrabaixo";
    case 6: return "Piano";
    case 7: return "Guitarra";
    case 8: return "Violino";
    case 9: return "Saxofone";
    case 10: return "Teclado";
    case 11: return "Flauta";
    case 12: return "Tambor";
    case 13: return "Bandolim";
    case 14: return "Trompete";
    
  }
}

const category = (idCategoria) => {
  switch(idCategoria){
    case 1: return "Samba";
    case 2: return "Sertanejo";
    case 3: return "Rock";
    case 4: return "Pagode";
    case 5: return "MPB";
    case 7: return "Gospel";
    case 8: return "Reggae";
    case 9: return "Blues";
    case 10: return "Jazz";
    case 11: return "Música Erudita";
  }
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, catRes] = await Promise.all([
          axios.get(`https://erick5457.c44.integrator.host/api/usuarios/${idUser}`),
          axios.get("https://erick5457.c44.integrator.host/api/categorias")
        ]);

        

        setUser(userRes.data);
        
        setCategories(catRes.data);
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    };

    fetchData();
  }, [idUser]);

  
 
  

  if (!user) return <Text> Carregando...</Text>;
  
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow:1, paddingBottom:100, paddingHorizontal:16 }}>
      <View style={{ paddingTop:56 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          color="#000"
          size={24}
          onPress={() => navigation.goBack()}
        />

        <Image
          source={user.foto ? { uri: user.foto } : require("../asset/avatar.png")}
          style={{ width:"100%", height:290, borderRadius:50, alignSelf:"center", marginTop:22 }}
          resizeMode="cover"
        />

        <Text style={{ fontSize:38, fontWeight:600, marginTop:16 }}>{user.nome}, {user.idade}</Text>
        <Text style={{ fontSize:20, color:"#555555", marginTop:8 }}>
          <MaterialCommunityIcons name="google-maps" size={22} color="#222"/>
          {user.cidade}, {user.uf}
        </Text>

        <View style={{ flexDirection:"row", marginTop:16, gap:32 }}>
          <Text style={{ color:"#555555", fontSize:20 }}>
            <MaterialCommunityIcons name="music-circle" size={22} color="#000"/>
            {category(user.idCategoria)}
          </Text>
          <Text style={{ fontSize:20, color:"#555555" }}>
            <MaterialCommunityIcons name="guitar-acoustic" size={22} color="#000"/>
            {instrumento(user.idInstrumento)}
          </Text>
        </View>

        <Text style={{ fontSize:28, fontWeight:700, paddingTop:16 }}>
          {formatReais(user.preco)}
        </Text>

        <Button
        icon="chat-outline"
        mode="contained"
        style={{ backgroundColor:"black", width:"100%", paddingVertical:4, marginTop:16 }}
        onPress={() =>
          navigation.navigate("ScreenChatTwo", {
            
            send_id: user.idUsuario,

            receive_id: idUser,
          })
        }
      >
        Envie uma mensagem
      </Button>


        <View style={{ flexDirection:"row", justifyContent:"space-around", marginVertical:32 }}>
          <SocialIcon platform="Instagram" icon="instagram" username={user.instagram} urlScheme="instagram://user?username=" webBaseUrl="https://www.instagram.com/"/>
          <SocialIcon platform="Facebook" icon="facebook" username={user.facebook} urlScheme="facebook://user?username=" webBaseUrl="https://www.facebook.com/"/>
          <SocialIcon platform="WhatsApp" icon="whatsapp" username={user.whatsapp} urlScheme="whatsapp://send?phone=" webBaseUrl="https://wa.me/"/>
        </View>

        <Text style={{ fontSize:22, fontWeight:600 }}>Descrição</Text>
        <Text style={{ fontSize:18 ,marginTop:16}}>{user.descricao}</Text>
      </View>
    </ScrollView>
  );
}
