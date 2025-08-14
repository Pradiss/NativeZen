import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "../components/Style";
import InputMessage from "../components/InputMessage";
import { apiMessageReceive, apiMessageSender, apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export function ScreenChat({ route, navigation }) {
  const { idMensagens } = route.params;

  const [iduser, setIdUser] = useState("")
  const [messages, setMessages] = useState([]);
  const isFocused = useIsFocused()

  const loadMessages = async () => {
    try {
      const recebeu_id = await AsyncStorage.getItem("idUsuario")
      const res = await apiMessageReceive.get(`/${recebeu_id}`);
      setMessages(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
    }
  };

  const loadSender = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem("idUsuario")
      const res = await apiMessageSender.get(`/${idUsuario}`)
      setMessages(res.data)
    } catch (e) {
      Alert.alert("Erro ao carregar mensagem", e.message)
    }
  }

  const loadUsers = async () =>{
    try{
      const idUsuario = await AsyncStorage.getItem("idUsuario")
      const res = await apiUsers.get(`/${idUsuario}`)
      setIdUser(res.data)
    }catch(e){
      Alert.alert("Erro ao carregar usuario", e.message)
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadSender()
      loadUsers()
      loadMessages();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#6BD2D7" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>

          <View style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: "#fff",
          }}>
            <Avatar.Image
              size={65}
              source={ require("../asset/avatar.png")}
              style={{ alignSelf: "flex-start", backgroundColor: "#232323" }}
              imageStyle={{ resizeMode: "cover" }}
            />

            <View style={{ flex: 1, gap: 8 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                {iduser && messages.recebeu_id === iduser ? "Você" : iduser?.nome || "Usuario "}

              </Text>
              <Text style={{ color: "#000", fontSize: 14 }}>{messages.texto}</Text>

            </View>
            
          </View>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.idMensagens.toString()}
            renderItem={({ item }) => (

              <View style={{ marginVertical: 8 }}>

                <Text>{item.enviou_id}</Text>
                <Text>{item.recebeu_id}</Text>
                <Text>{item.texto}</Text>
                <Text style={{ fontSize: 12, color: "#fff" }}>
                  {item.data_envio}
                </Text>
              </View>
            )}

            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>

        <View
          style={{
            paddingVertical: 8,
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
