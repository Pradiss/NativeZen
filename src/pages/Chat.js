import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TextInput } from "react-native";
import { apiMessage, apiMessageSender } from "../service.js/Api";
import styles from "../components/Style";
import CardChat from "../components/CardChat";

export default function Chat({ navigation }) {

  const [chat, setChat] = useState([])
  const [search, setSearch] = useState("")
  const isFocused = useIsFocused()

  const LoadingChat = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const idUsuario = await AsyncStorage.getItem("idUsuario")
      const res = await apiMessageSender.get(`/${idUsuario}`)

      setChat(res.data)
    } catch (e) {
      Alert.alert("Erro ao mostrar as mensagem", e.message)
    }

  }

  useEffect(() => {
    if (isFocused) {
      LoadingChat()
    }
  }, [isFocused])

  return (
    <View style={{flex:1, padding:16,}}>
      <TextInput style={[styles.input,{width:"100%"}]} placeholder="Buscar chat" value={search} onChangeText={setSearch} />


      <FlatList
        data={chat.slice(0, 4)}
        keyExtractor={(item) => item.idMensagens.toString()}
        renderItem={({ item }) => {
          return (
            <CardChat
              item={item}
              navigation={navigation}
            />
          )
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListFooterComponent={<View style={{ height: 80 }} />}
      />

    </View>
  );
}
