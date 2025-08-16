import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"
import React, { useState, useEffect } from "react"
import { View, Text, FlatList, Alert, TextInput } from "react-native"
import { apiMessageAll, apiMessageReceive, apiMessageSender } from "../service.js/Api"
import styles from "../components/Style"
import CardChat from "../components/CardChat"

export default function Chat({ navigation }) {
  const [chat, setChat] = useState([])
  const [search, setSearch] = useState("")
  const isFocused = useIsFocused()
  

  const loadChat = async () => {
  try {
    const idUsuario = await AsyncStorage.getItem("idUsuario");
    const token = await AsyncStorage.getItem("token");

    const [recebidasRes, enviadasRes] = await Promise.all([
      apiMessageReceive.get(`/${idUsuario}`, { headers: { Authorization: `Bearer ${token}` } }),
      apiMessageSender.get(`/${idUsuario}`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);

    const todasMensagens = [...recebidasRes.data, ...enviadasRes.data];
    setChat(todasMensagens);
  } catch (e) {
    Alert.alert("Erro ao carregar chat", e.message);
  }
}
  useEffect(() => {
    if (isFocused) {
      loadChat()
    }
  }, [isFocused])

 const mensagensFiltradas = []
  chat.forEach((msg) => {
    const existe = mensagensFiltradas.find(
      (m) => m.enviou_id === msg.enviou_id
    );
    if (!existe) {
      mensagensFiltradas.push(msg)
    }
  });

  return (
    <View style={{paddingHorizontal:16,paddingTop:56}}>

      <TextInput
        style={[styles.input, { width: "95%", }]}
        placeholder="Buscar chat"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={mensagensFiltradas.slice(0, 4).reverse()}
        keyExtractor={(item) => item.idMensagens.toString()}
        renderItem={({ item }) => {
          return <CardChat item={item} navigation={navigation} />
        }}
        contentContainerStyle={{ paddingBottom: 100, marginTop:16,}}
        ListFooterComponent={<View style={{ height: 80 }} ListEmptyComponent={null} />}
      />
    </View>
  );
}
