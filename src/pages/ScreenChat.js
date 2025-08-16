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
import { apiMessage, apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { formatarDataOuHora } from "../utils/mask";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function ScreenChat({ route, navigation }) {
  const { enviou, recebeu } = route.params;

  const [iduser, setIdUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const isFocused = useIsFocused();

  // buscar id do usuário logado
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("idUsuario");
      setIdUser(userId);
    };
    getUserId();
  }, []);

  // Buscar usuário com cache
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

  // Carregar mensagens do chat
  const loadMessages = async () => {
    try {
      const res = await apiMessage.get("/", {
        params: { enviou_id: enviou, recebeu_id: recebeu },
      });
      setMessages(res.data);
      // carrega os dados dos dois usuários (remetente e destinatário)
      getUsuario(enviou);
      getUsuario(recebeu);
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
    }
  };

  // Polling
  useEffect(() => {
    let interval;
    if (isFocused) {
      loadMessages();
      interval = setInterval(loadMessages, 15000);
    }
    return () => clearInterval(interval);
  }, [isFocused]);

  // id da outra pessoa (para mostrar no topo)
  const otherId = iduser == enviou ? recebeu : enviou;

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

          <Avatar.Image
            size={40}
            source={require("../asset/avatar.png")}
            style={{ backgroundColor: "#232323" }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {usuarios[otherId]?.nome || "Usuário"}
            </Text>
          </View>
        </View>

        {/* Lista de mensagens */}
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

        {/* input */}
        <View style={{ padding: 8, backgroundColor: "#fff" }}>
          <InputMessage
            iduser={iduser}
            recebeu={otherId}
            loadMessages={loadMessages}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
