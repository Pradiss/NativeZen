import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { apiSendMessage } from "../service.js/Api";

export default function InputMessage({ receiverId, loadMessages }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return; // não envia vazio

    try {
      const senderId = await AsyncStorage.getItem("idUsuario");

      await apiSendMessage.post("/", {
        enviou_id: senderId,
        recebeu_id: receiverId,
        texto: message,
      });

      setMessage(""); // limpa input
      loadMessages(); // atualiza chat
    } catch (e) {
      Alert.alert("Erro ao enviar mensagem", e.message);
    }
  };

  return (
    <View style={{ flexDirection: "row", padding: 8, alignItems: "center", gap: 8 }}>
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
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={sendMessage} // dispara ao apertar Enter
        returnKeyType="send" // mostra botão “Enviar” no teclado
      />
      <Button
        mode="contained"
        style={{ backgroundColor: "black", padding: 5 }}
        onPress={sendMessage}
      >
        Enviar
      </Button>
    </View>
  );
}
