import React, { useState } from "react";
import { View, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import { apiSendMessage } from "../service.js/Api";

export default function InputMessage({ receiverId, loadMessages }) {
const [message, setMessage] = useState("");

  return (
    <View
      style={{ flexDirection: "row", padding: 8, alignItems: "center", gap: 8 }}
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
      />
      <Button
        mode="contained"
        style={{ backgroundColor: "black", padding: 5 }}
        onPress={""}
      >
        Enviar
      </Button>
    </View>
  );
}
