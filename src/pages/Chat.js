import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, FlatList, Alert } from "react-native";
import { apiMessageAll } from "../service.js/Api";
import styles from "../components/Style";
import CardChat from "../components/CardChat";

export default function Chat({ navigation }) {
  const [chat, setChat] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();

  const loadMessages = useCallback(async () => {
    try {
      const idUsuario = await AsyncStorage.getItem("idUsuario");
      const { data } = await apiMessageAll.get(`/${idUsuario}`);
      setChat(data.reverse());
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
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
