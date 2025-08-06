import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, TextInput, Text, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-web";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUsers } from "../service.js/Api";

export default function EditDescription({  navigation }) {

  const [description, setDescription] = useState("")
  const isFocused = useIsFocused()

  useEffect(() => {

    const LoadingDescription = async () => {
      try {

        const idUsuario = await AsyncStorage.getItem("idUsuario")
        const token = await AsyncStorage.getItem("api_token")
        const res = await apiUsers.get(
          `/${idUsuario}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        )
        setUsers(res.data)
        setDescription(res.data.description)
      } catch (error) {
        Alert.alert("Erro", error.message || "Não foi possível carregar a descrição.");
      }

    }

    if (isFocused)
      LoadingDescription()
  }, [isFocused])


  const EditDescription = async () => {
    const api = await AsyncStorage.getItem("api_token");
    const idUsuario = await AsyncStorage.getItem("idUsuario");
    try {
        const response = await apiUsers.put(
          `${idUsuario}`,
          {
           descricao,
          },
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${api}`,
            },
          }
        )
      
        navigation.navigate("MainTabs", {screen: "Profile"})
  
        
      } catch (error) {
        Alert.alert("Erro ao editar um usuario", error.message)
      }
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          value={description}
          onChangeText={setDescription}

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
            textAlignVertical: "top",
          }}
          onPress={EditDescription}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
