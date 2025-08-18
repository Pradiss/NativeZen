import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { apiMessage } from "../service.js/Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputMessage({ enviou, recebeu, onSend }) {

  const [texto,setTexto] = useState("")


  const enviarMensagem = async () => {
    try{
      const token = await AsyncStorage.getItem("token")
      const response = await axios.post(
        "https://erick5457.c44.integrator.host/api/mensagens",
        {
          enviou,
          recebeu,
          texto:texto
        },
        {
          headers: {

            "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
          },
        }
      ); 

      console.log(response);
      // Chama a função onSend para atualizar as mensagens
      if (onSend) {
        onSend();
      }
      setTexto(""); // limpa o campo após enviar
    }catch(e){
      Alert.alert("Erro ao enviar mensagem", e.message)
    }    
  }

 
  return (
    <View style={{ padding: 8, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 47,
            backgroundColor: "#fff",
            paddingHorizontal: 16,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: "#c7c7c7",
          }}
          placeholder="Envie uma mensagem"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={enviarMensagem}
          returnKeyType="send"
        />
        <Button
          mode="contained"
          style={{ backgroundColor: "black", padding: 5 }}
          labelStyle={{color:"white"}}
          disabled={!texto.trim()}
          onPress={enviarMensagem}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}
