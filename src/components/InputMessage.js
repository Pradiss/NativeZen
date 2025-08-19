import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import { Button } from "react-native-paper";
import { apiMessage } from "../service.js/Api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputMessage({ enviou, recebeu, onSend }) {

  const [texto,setTexto] = useState("")
  const [loading, setLoading] = useState(false);

  const enviarMensagem = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Erro", "Token inválido ou expirado — faça login novamente");
        return;
      }

      const response = await axios.post(
        "https://erick5457.c44.integrator.host/api/mensagens",
        {
          enviou_id: enviou,
          recebeu_id: recebeu,
          texto: texto,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // apenas chama o callback
      if (onSend) {
        onSend(response.data); 
      }

      setTexto("");
    } catch (e) {
      Alert.alert("Erro ao enviar mensagem", e.message);
    } finally {
      setLoading(false);
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
          contentStyle={{ height: 47 }} 
          style={{ backgroundColor: "black", paddingHorizontal: 16 }}
          labelStyle={{ color: "white" }}
          disabled={loading || !texto.trim()}
          onPress={enviarMensagem}
        >
          Enviar
        </Button>

      </View>
    </View>
  );
}
