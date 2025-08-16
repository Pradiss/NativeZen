import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { formatarDataOuHora } from "../utils/mask";

export default function CardChat({ item, navigation, getUsuario }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!item.enviou_id) return;
      const data = await getUsuario(item.enviou_id);
      if (isMounted) setUser(data);
    })();

    return () => {
      isMounted = false; 
    };
  }, [item.enviou_id]);

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
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16, gap: 12 }}>
        <Avatar.Image
          size={65}
          source={user?.foto ? { uri: user.foto } : require("../asset/avatar.png")}
          style={{ backgroundColor: "#232323" }}
          imageStyle={{ resizeMode: "cover" }}
        />
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {user?.nome || "Usuário"}
          </Text>
          <Text style={{ color: "#000", fontSize: 14 }}>
            {item.texto.split(" ").slice(0, 4).join(" ")}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end", gap: 8 }}>
          <Text style={{ color: "#000", fontSize: 16 }}>
            {formatarDataOuHora(item.data_envio)}
          </Text>
        </View>
      </View>

      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, marginVertical: 10 }} />
    </TouchableOpacity>
  );
}
