import React, { useState } from "react";
import { View, Alert, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePhoto() {
  const [fotoUser, setFotoUser] = useState(null);

  const chooseFoto = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.7,
      },
      async (response) => {
        if (response.didCancel) {
          Alert.alert("Você cancelou a seleção da foto");
        } else if (response.errorCode) {
          Alert.alert("Erro ao abrir a galeria:", response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setFotoUser(uri);

          // >>> Envia pro backend
          try {
            const token = await AsyncStorage.getItem("token");
            const formData = new FormData();

            formData.append("foto", {
              uri: uri,
              name: "profile.jpg",
              type: "image/jpeg",
            });

            await axios.post(
              "https://erick5457.c44.integrator.host/api/perfil/foto",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            Alert.alert("Foto enviada com sucesso 🎉");
          } catch (e) {
            Alert.alert("Erro ao enviar foto", e.message);
          }
        }
      }
    );
  };

  return (
    <View style={{ alignItems: "center", marginTop: 50 }}>
      <Button mode="contained" onPress={chooseFoto}>
        Escolher foto do perfil
      </Button>

      {fotoUser && (
        <Image
          source={{ uri: fotoUser }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            marginTop: 20,
          }}
        />
      )}
    </View>
  );
}
