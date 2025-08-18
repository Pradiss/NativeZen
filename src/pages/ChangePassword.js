import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Image } from "react-native";
import styles from "../components/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiChangePassword } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangePassword({ navigation }) {
  const [senhaNova, setSenhaNova] = useState("");
  const [confirmSenhaNova, setConfirmSenhaNova] = useState("");

  const editPassword = async () => {
    if (senhaNova.length < 6) {
      return Alert.alert("Erro", "A nova senha deve conter no mínimo 6 caracteres");
    }

    if (senhaNova !== confirmSenhaNova) {
      return Alert.alert("Erro", "A confirmação não confere com a nova senha");
    }

    try {
      const idUsuario = await AsyncStorage.getItem("idUsuario")
      await apiChangePassword.put(
  `/changePassword/${idUsuario}`,
  { senha: senhaNova },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
  }
);

      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      setSenhaNova("");
      setConfirmSenhaNova("");
    } catch (error) {
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Ocorreu um erro ao atualizar a senha."
      );
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 56 }}>
      <View style={{ alignItems: "start" }}>
        <MaterialCommunityIcons
          name="arrow-left"
          color="#000"
          size={24}
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../asset/logoZene.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 22 }}>Gostaria de mudar sua senha?</Text>
        <Text style={{ paddingBlock: 8 }}>
          Digite a nova senha e confirme abaixo
        </Text>

        <TextInput
          placeholderTextColor="#ccc"
          style={styles.inputLogin}
          value={senhaNova}
          placeholder="Nova Senha"
          secureTextEntry={true}
          onChangeText={setSenhaNova}
        />

        <TextInput
          placeholderTextColor="#ccc"
          style={styles.inputLogin}
          value={confirmSenhaNova}
          placeholder="Confirmar Nova Senha"
          secureTextEntry={true}
          onChangeText={setConfirmSenhaNova}
        />

        <Pressable
          style={{
            borderRadius: 20,
            width: "100%",
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 32,
            backgroundColor: "black",
            padding: 8,
          }}
          onPress={editPassword}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Atualizar Senha</Text>
        </Pressable>
      </View>
    </View>
  );
}
