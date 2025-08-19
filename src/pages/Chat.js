import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, TextInput, FlatList, Alert } from "react-native";
import { apiMessageAll, apiUsers } from "../service.js/Api";
import styles from "../components/Style";
import CardChat from "../components/CardChat";

export default function Chat({ navigation }) {
  const [chat, setChat] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const userCache = useRef({});

  const loadMessages = useCallback(async () => {
    try {
      const idUsuario = await AsyncStorage.getItem("idUsuario");
      if (!idUsuario) return;

      const { data: mensagens } = await apiMessageAll.get(`/${idUsuario}`);
      if (!mensagens || mensagens.length === 0) {
        setChat([]);
        return;
      }

      // 👉 identifica o "outro" usuário em cada mensagem
      const uniqueUserIds = [
        ...new Set(
          mensagens.map((m) =>
            m.enviou_id == idUsuario ? m.recebeu_id : m.enviou_id
          )
        ),
      ];

      // busca apenas os que não estão no cache
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          if (!userCache.current[userId]) {
            const { data: user } = await apiUsers.get(`/${userId}`);
            userCache.current[userId] = user;
          }
        })
      );

      // adiciona o campo 'user' correspondente ao outro participante
      const mensagensComUsuario = mensagens.map((msg) => {
        const other =
          msg.enviou_id == idUsuario ? msg.recebeu_id : msg.enviou_id;
        return {
          ...msg,
          user: userCache.current[other],
        };
      });

      // agrupa por usuário e mantém apenas a mais recente
      const chatMap = {};
      mensagensComUsuario.forEach((msg) => {
        const userId = msg.user.idUsuario;
        const isNewer =
          !chatMap[userId] ||
          new Date(msg.data_envio) > new Date(chatMap[userId].data_envio);

        if (isNewer) {
          chatMap[userId] = msg;
        }
      });

      // ordena por data (decrescente)
      const ordered = Object.values(chatMap).sort(
        (a, b) => Date.parse(b.data_envio) - Date.parse(a.data_envio)
      );
      setChat(ordered);
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

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 56 }}>
      <TextInput
        style={[styles.input, { width: "100%" }]}
        placeholder="Buscar chat"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={chat.filter((c) =>
          c.user.nome.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.idMensagens.toString()}
        renderItem={({ item }) => (
          <CardChat item={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 16 }}
      />
    </View>
  );
}
