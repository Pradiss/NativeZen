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
      const res = await apiMessageReceive.get(`/${recebeu_id}`);
      setMessages(res.data);
    } catch (e) {
      console.log("Erro ao carregar mensagens", e.message);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.recebeu_id.toString()}
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
          <InputMessage />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
