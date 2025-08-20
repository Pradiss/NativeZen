import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiMessage, apiUsers } from "../service.js/Api";
import { useIsFocused } from "@react-navigation/native";
import { formatarDataOuHora } from "../utils/mask";
import InputMessage from "../components/InputMessage";

export function ScreenChat({ route, navigation }) {
  const { enviou, recebeu } = route.params;

  const [iduser, setIdUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const isFocused = useIsFocused();
  const flatListRef = useRef(null);

  
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("idUsuario");
      setIdUser(Number(userId));
    };
    getUserId();
  }, []);


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

  const loadMessages = async () => {
    try {
      const res = await apiMessage.get("", {
        params: { enviou_id: enviou, recebeu_id: recebeu },
      });

      
      const messagesArray = Array.isArray(res.data) ? res.data : [];
      const ordered = messagesArray.sort(
        (a, b) => new Date(a.data_envio) - new Date(b.data_envio)
      );
      setMessages(ordered);

      
      if (!usuarios[enviou]) {
        await getUsuario(enviou);
      }
      if (!usuarios[recebeu]) {
        await getUsuario(recebeu);
      }
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadMessages();
    }
  }, [isFocused]);

  const otherId = iduser == enviou ? recebeu : enviou;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#6BD2D7" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            source={{ uri: usuarios[otherId]?.foto }}
            style={{ backgroundColor: "#232323" }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {usuarios[otherId]?.nome || "Usuário"}
            </Text>
          </View>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.idMensagens.toString()}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 10,
            paddingHorizontal: 8
          }}
          renderItem={({ item }) => {
            const isMyMessage = Number(item.enviou_id) === Number(iduser);
            return (
              <View
                style={{
                  marginVertical: 8,
                  padding: 12,
                  paddingHorizontal: 16,
                  borderRadius: 16,
                  backgroundColor: isMyMessage ? "#DCF8C6" : "#fff",
                  alignSelf: isMyMessage ? "flex-end" : "flex-start",
                }}
              >
                <Text>{item.texto}</Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 12 }}>
                    {formatarDataOuHora(item.data_envio)}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        <InputMessage enviou={enviou} recebeu={recebeu} onSend={loadMessages} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
