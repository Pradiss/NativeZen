import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import styles from "../components/Style";
import InputMessage from "../components/InputMessage";
import { apiMessageSend, apiMessageReceive } from "../service.js/Api";

export function ScreenChat({ route, navigation }) {
  const { idMensagens } = route.params;

  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const res = await apiMessageReceive.get(`/${idMensagens}`);
      setMessages(res.data);
    } catch (e) {
      console.log("Erro ao carregar mensagens", e.message);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [idMensagens]);

  const sendMessage = async (text) => {
  try {
    if (!text.trim()) return;

    // Pegue os IDs do AsyncStorage ou da rota
    const enviou_id = await AsyncStorage.getItem("idUsuario"); // Exemplo: usuário logado
    const recebeu_id = route.params.recebeu_id; // Ou pegue da rota ou contexto

    await apiMessageSend.post("/", {
      idMensagens,
      enviou_id: Number(enviou_id),
      recebeu_id: Number(recebeu_id),
      texto: text,
    });

    await loadMessages(); // recarrega as mensagens
  } catch (e) {
    console.log("Erro ao enviar mensagem", e.message);
  }
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.idMensagens.toString()}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 8 }}>
                <Text>{item.texto}</Text>
                <Text style={{ fontSize: 12, color: "#999" }}>
                  {item.data_envio}
                </Text>
              </View>
            )}
            inverted
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>

        
        <View
          style={{
            
            borderTopWidth: 1,
            borderColor: "#ccc",
            paddingVertical: 12,
            paddingHorizontal: 8,
            backgroundColor: "#fff",
          }}
        >
          <InputMessage onSend={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
