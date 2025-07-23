import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import styles from "../components/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ChangePassword({ navigation }) {
  const [senha, setSenha] = useState("");

  const [senhaNova, setSenhaNova] = useState("");

  const ChangePassword = async () => {
  
  }

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 56,
      }}
    >
      <View>
        <View style={{ alignItems: "start", paddingHorizontal: 16 }}>
        <MaterialCommunityIcons
          name="arrow-left"
          color="#000"
          size={24}
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        />
      </View>
      <View
        style={{
          paddingBottom: 26,
          flexDirection: "row",
          gap: 0,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../asset/logoZene.png")}
          style={{ width: 100, height: 100, alignItems:"center" }}
          resizeMode="contain"
        />
      </View>

      <Text style={{ fontSize: 22 }}>Gostaria de mudar sua senha?</Text>
      <Text style={{ paddingBlock: 8 }}>
        Digite sua senha atual e a nova senha desejada
      </Text>

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.inputLogin}
        value={senha}
        placeholder="Senha Atual"
        secureTextEntry={true} // hide password
        onChangeText={setSenha}
      />
      {senha.length > 0 && senha.length < 6 && (
        <Text style={{ color: "red", marginBottom: 8 }}>
          A senha deve conter no mínimo 6 caracteres
        </Text>
      )}

      <TextInput
        placeholderTextColor="#ccc"
        style={styles.inputLogin}
        value={senhaNova}
        placeholder="Senha antiga"
        secureTextEntry={true} // hide password
        onChangeText={setSenhaNova}
      />
      {senha.length > 0 && senha.length < 6 && (
        <Text style={{ color: "red", marginBottom: 8 }}>
          A senha deve conter no mínimo 6 caracteres
        </Text>
      )}

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
          color: "white",
        }}
        onPress={ChangePassword}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Atualizar Senha </Text>
      </Pressable>
      </View>
    </View>
  );
}
