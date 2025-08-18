import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiMessage, apiUsers, apiSendMessage } from "../service.js/Api";
import { formatarDataOuHora } from "../utils/mask";

export function ScreenChat({ route, navigation }) {
  const { enviou, recebeu } = route.params;

  const [iduser, setIdUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [message, setMessage] = useState(""); // mensagem do input
  const isFocused = useIsFocused();

  // Pegar ID do usuário logado
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("idUsuario");
      setIdUser(userId);
    };
    getUserId();
  }, []);

  // Pegar dados do usuário
  const getUsuario = async (id) => {
    if (usuarios[id]) return usuarios[id];
    try {
      const res = await apiUsers.get(`/${id}`);
      setUsuarios((prev) => ({ ...prev, [id]: res.data }));
      return res.data;
    } catch (e) {
      console.log("Erro ao carregar usuário", e.message);
      return null;
    }
  };

  // Carregar mensagens
  const loadMessages = async () => {
    try {
      const res = await apiMessage.get("/", {
        params: { enviou_id: enviou, recebeu_id: recebeu },
      });
      setMessages(res.data);

      if (!usuarios[enviou]) await getUsuario(enviou);
      if (!usuarios[recebeu]) await getUsuario(recebeu);
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
    }
  };

  // Atualiza mensagens a cada 15s
  useEffect(() => {
    let interval;
    if (isFocused) {
      loadMessages();
      interval = setInterval(loadMessages, 15000);
    }
    return () => clearInterval(interval);
  }, [isFocused]);

  const otherId = iduser == enviou ? recebeu : enviou;

  // Enviar mensagem
  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const senderId = await AsyncStorage.getItem("idUsuario");
      await apiSendMessage.post("/", {
        enviou_id: senderId,
        recebeu_id: otherId,
        texto: message,
      });
      setMessage("");
      loadMessages();
    } catch (e) {
      Alert.alert("Erro ao enviar mensagem", e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#6BD2D7" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            padding: 8,
            backgroundColor: "#fff",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color="#000"
            onPress={() => navigation.goBack()}
          />

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            onPress={() =>
              navigation.navigate("ProfileDetails", { idUsuario: otherId })
            }
          >
            <Avatar.Image
              size={40}
              source={
                usuarios[otherId]?.foto
                  ? { uri: usuarios[otherId].foto }
                  : require("../asset/avatar.png")
              }
              style={{ backgroundColor: "#232323" }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {usuarios[otherId]?.nome || "Usuário"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Mensagens */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.idMensagens.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 8,
                padding: 12,
                paddingHorizontal: 16,
                borderRadius: 16,
                backgroundColor:
                  item.enviou_id == iduser ? "#DCF8C6" : "#fff",
                alignSelf:
                  item.enviou_id == iduser ? "flex-end" : "flex-start",
              }}
            >
              <Text>{item.texto}</Text>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 12 }}>
                  {formatarDataOuHora(item.data_envio)}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 8 }}
        />

        {/* Input */}
        <View
          style={{
            flexDirection: "row",
            padding: 8,
            alignItems: "center",
            gap: 8,
            backgroundColor: "#fff",
          }}
        >
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
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <Button
            mode="contained"
            style={{ backgroundColor: "black", padding: 5 }}
            onPress={sendMessage}
          >
            Enviar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
