import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, FlatList, Alert } from "react-native";
import { apiMessageAll, apiUsers } from "../service.js/Api";
import styles from "../components/Style";
import CardChat from "../components/CardChat";

export default function Chat({ navigation }) {
  const [chat, setChat] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const loadMessages = useCallback(async () => {
    try {
      const idUsuario = await AsyncStorage.getItem("idUsuario");
      if (!idUsuario) return;

      // Pega todas as mensagens do usuário logado
      const { data: mensagens } = await apiMessageAll.get(`/${idUsuario}`);
      if (!mensagens || mensagens.length === 0) {
        setChat([]);
        return;
      }

      // Cache para não buscar o mesmo usuário várias vezes
      const userCache = {};

      const mensagensComUsuario = await Promise.all(
        mensagens.map(async (msg) => {
          const userId = msg.recebeu_id;

          if (!userCache[userId]) {
            const { data: user } = await apiUsers.get(`/${userId}`);
            userCache[userId] = user;
          }

          return { ...msg, user: userCache[userId] };
        })
      );

      // Agrupa mensagens por usuário, mantendo apenas a última
      const chatMap = {};
      mensagensComUsuario.forEach((msg) => {
        const userId = msg.user.idUsuario;
        if (
          !chatMap[userId] ||
          new Date(msg.data_envio) > new Date(chatMap[userId].data_envio)
        ) {
          chatMap[userId] = msg;
        }
      });

      setChat(Object.values(chatMap));
    } catch (e) {
      console.log("Erro ao carregar mensagens:", e);
      Alert.alert("Erro ao carregar mensagens", e.message || e.toString());
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadMessages();
    }
  }, [isFocused, loadMessages]);

  const renderItem = ({ item }) => (
    <CardChat item={item} navigation={navigation} />
  );

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 56 }}>
      <TextInput
        style={[styles.input, { width: "95%" }]}
        placeholder="Buscar chat"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={chat}
        keyExtractor={(item) => item.idMensagens.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 16 }}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
}
