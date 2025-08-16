import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import { apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarDataOuHora } from "../utils/mask";

export default function CardChat({ item, navigation }) {
  const [userLogged, setUserLogged] = useState(null);
  const [otherUser, setOtherUser] = useState(null);

  // obtém id do usuário logado
  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("idUsuario");
      setUserLogged(id);
    };
    getUserId();
  }, []);

  // busca informações do outro usuário (remetente OU destinatário)
  useEffect(() => {
    const loadOtherUser = async () => {
      if (!userLogged) return;

      // se o usuário logado for o remetente, o outro é o destinatário
      const otherId = item.enviou_id == userLogged ? item.recebeu_id : item.enviou_id;

      try {
        const res = await apiUsers.get(`/${otherId}`);
        setOtherUser(res.data);
      } catch (e) {
        Alert.alert("Erro ao carregar usuário", e.message);
      }
    };

    loadOtherUser();
  }, [userLogged, item]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ScreenChat", {
          idMensagens: item.idMensagens,
          recebeu: item.recebeu_id,
          enviou: item.enviou_id,
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBlock: 16,
          gap: 12,
        }}
      >
        <Avatar.Image
          size={65}
          source={
            otherUser?.foto
              ? { uri: otherUser.foto }
              : require("../asset/avatar.png")
          }
          style={{ backgroundColor: "#232323" }}
          imageStyle={{ resizeMode: "cover" }}
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {item.enviou_id == userLogged ? "Você" : otherUser?.nome || "Usuário"}
          </Text>
          <Text style={{ color: "#000", fontSize: 14 }}>
            {item.texto.split(" ").slice(0, 4).join(" ")}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#000", fontSize: 16 }}>
            {formatarDataOuHora(item.data_envio)}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />
    </TouchableOpacity>
  );
}
