import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { lauchImageLibrary} from "react-native-image-picker"
import { Button } from "react-native-paper";

export default function ChangePhoto({ navigation }) {

  const [fotoUser, setFotoUser] = useState(null)

  const chooseFoto = () => {
    lauchImageLibrary(
      {
        mediaType: "photo", 
        quality: 0.7,
      },
      (response) => {
        if(response.didCancel){
          Alert.alert("Voce Cancelou a seleção de foto")
        } else if (response.errorCode){
          Alert.alert("Erro ao abrir a galeria: ", response.errorMessage)
        } else {
          const uri = response.assets[0].uri
          setFotoUser(uri)
        }
      }
    )
  }

  return (
     <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Button title="Escolher foto do perfil" onPress={chooseFoto} />
      {fotoUser && (
        <Image
          source={{ uri: fotoUser }}
          style={{ width: 150, height: 150, borderRadius: 75, marginTop: 20 }}
        />
      )}
    </View>
  );
  
}
