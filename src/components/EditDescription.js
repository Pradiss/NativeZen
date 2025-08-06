import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  TextInput,
  Text,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiUsers } from "../service.js/Api";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./Style";

export default function EditDescription() {
  const [descricao, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  

  useEffect(() => {
    const LoadingDescription = async () => {
      try {
        const idUsuario = await AsyncStorage.getItem("idUsuario");
        const token = await AsyncStorage.getItem("api_token");
        const res = await apiUsers.get(`/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
        setDescription(res.data.descricao || "");
      } catch (error) {
        Alert.alert(
          "Erro",
          error.message || "Não foi possível carregar a descrição."
        );
      }
    };

    if (isFocused) LoadingDescription();
  }, [isFocused]);

  const EditDescription = async () => {
    if (!descricao || descricao.trim().length === 0) {
      Alert.alert("Atenção", "A descrição não pode estar vazia.");
      return;
    }

    const token = await AsyncStorage.getItem("api_token");
    const idUsuario = await AsyncStorage.getItem("idUsuario");

    try {
      await apiUsers.put(
        `/${idUsuario}`,
        {
          ...userData,
          descricao,
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      Alert.alert("Sucesso", "Descrição editada com sucesso.");

      navigation.navigate("MainTabs", { screen: "Profile" });
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      Alert.alert(
        "Erro ao editar o usuário",
        error.response?.data?.message || error.message || "Erro desconhecido."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {!isEditing ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: 600 }}>
                    Descrição
                  </Text>
                  <MaterialIcons
                    name="edit-note"
                    size={24}
                    color="#000"
                    onPress={() => setIsEditing(true)}
                  />
                </View>
                <Text style={{ fontSize: 16, color: "#333" }}>{descricao}</Text>
              </>
            ) : (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 16,
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: 600 }}>
                    Descrição
                  </Text>
                  <MaterialIcons
                    name="edit-note"
                    size={24}
                    color="#000"
                    onPress={() => setIsEditing(false)}
                  />
                </View>
                <TextInput
                  value={descricao || ""}
                  onChangeText={setDescription}
                  placeholder="Digite sua descrição"
                  multiline
                  numberOfLines={4}
                  returnKeyType="done"
                  onSubmitEditing={EditDescription}
                  style={{
                    fontSize: 16,
                    color: "#333",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 12,
                    height: 150,
                    textAlignVertical: "top", 
                  }}
                />

                <TouchableOpacity
                  onPress={EditDescription}
                  style={styles.button}
                >
                  <Text style={{ fontSize: 16, color: "#fff" }}>Salvar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
