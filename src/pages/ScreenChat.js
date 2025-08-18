import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  TouchableOpacity
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

 
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("idUsuario");
      setIdUser(userId);
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

  useEffect(() => {
    let interval;
    if (isFocused) {
      loadMessages();
      interval = setInterval(loadMessages, 15000);
    }
    return () => clearInterval(interval);
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

  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
    onPress={() => navigation.navigate("ProfileDetails", { idUsuario: otherId })}
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
