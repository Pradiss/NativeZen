import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { formatarDataOuHora } from "../utils/mask";

export default function CardChat({ item, navigation }) {

  const user = item.user

  const avatarUri = user.foto 


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
          source={avatarUri ? { uri: avatarUri } : require("../asset/avatar.png")}
          style={{ backgroundColor: "#232323" }}
          imageStyle={{ resizeMode: "cover" }}
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {user.nome || "Usuário"}
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
