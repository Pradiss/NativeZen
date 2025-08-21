import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "./Style";

export default function CardUsers({ item, navigation }) {

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

  return(
    <View style={{flex:1}}>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileDetails", { idUser: item.idUsuario })}>
        <View style={styles.CardUser}>
          <ImageBackground
            source={item.fotoUrl ? { uri: item.fotoUrl} : require("../asset/avatar.png")}
            style={{ padding:12, width: 250, height:280, borderRadius:30 }}
            resizeMode="cover"
            imageStyle={{borderRadius:30}}
          />
          <View style={{padding:16, gap:8, justifyContent:"center", alignItems:"start"}}>
            <Text style={{fontSize:22,color:"#232323", fontWeight:600 }}>{item.nome}</Text>
            <Text style={{color:"#232323", fontSize:18, marginVertical:4 }}>
              <MaterialCommunityIcons name="google-maps" size={25} color="#6BD2D7"/>
              {item.cidade}
            </Text>
            <View style={{flexDirection:"row", gap:16, alignItems:"center"}}>
              <Text style={{color:"#232323", fontSize:18}}>
                <MaterialCommunityIcons name="music-circle" size={25} color="#6BD2D7"/>
                {category(item.idCategoria)}
              </Text>
              <Text style={{fontSize:18,color:"#232323"}}>
                <MaterialCommunityIcons name="guitar-acoustic" size={25} color="#6BD2D7"/>
                {instrumento(item.idInstrumento)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
