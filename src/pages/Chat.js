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

  // 🔴 cache persistente para usuários que já foram carregados
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

      // ids únicos dos usuários envolvidos no chat
      const uniqueUserIds = [...new Set(mensagens.map((m) => m.recebeu_id))];

      // 👉 busca somente os usuários que *ainda* não estão no cache
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          if (!userCache.current[userId]) {
            const { data: user } = await apiUsers.get(`/${userId}`);
            userCache.current[userId] = user;
          }
        })
      );

      // adiciona o user em cada mensagem
      const mensagensComUsuario = mensagens.map((msg) => ({
        ...msg,
        user: userCache.current[msg.recebeu_id],
      }));

      // agrupa por usuário e mantém apenas a última
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
        renderItem={({ item }) => (
          <CardChat item={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 100, marginTop: 16 }}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
    </View>
  );
}
