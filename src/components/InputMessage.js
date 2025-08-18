import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { apiMessage } from "../service.js/Api";

export default function InputMessage({ enviou, recebeu, onSend }) {
  const [message, setMessage] = useState("");

 
  return (
    <View style={{ padding: 8, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          alignItems: "center",
          gap: 8,
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
          
          disabled={!message.trim()}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}
