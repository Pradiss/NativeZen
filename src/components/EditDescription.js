import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, TextInput, Text, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-web";

export default function EditDescription({ navigation }) {
  const [description, setDescription] = useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, padding: 16, justifyContent:"center"}}>
        <Text style={{ marginBottom: 8 }}> Editar Descrição</Text>
        <TextInput
          placeholder="Digite sua descrição"
          multiline
          numberOfLines={4}
          style={{
            width: "100%",
            height: 150,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
