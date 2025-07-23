import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import styles from "../components/Style";
import { apiRegister } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DropdownModal } from "../components/Modal";
import {
  categoriaOptions,
  getCategoriaLabel,
  getInstrumentoLabel,
  instrumentoOptions,
} from "../utils/ArraysCategory";
import { Avatar } from "react-native-paper";
import { formatMoney } from "../utils/mask";
import { set } from "date-fns";

export default function Register({ navigation }) {
  const [email, setEmail] = useState([]);
  const [nome, setNome] = useState([]);
  const [whatsapp, setWhatsapp] = useState([]);
  const [instagram, setInstagram] = useState([]);
  const [facebook, setFacebook] = useState([]);
  const [idade, setIdade] = useState([]);
  const [uf, setUf] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [preco, setPreco] = useState([]);
  const [idInstrumento, setIdInstrumento] = useState([]);
  const [idCategoria, setIdCategoria] = useState([]);

  const Register = async () => {
    const api = await AsyncStorage.getItem("api_token");
    try {
      const response = await apiRegister.put(
        `${api}`,
        {
          nome,
          idade,
          instagram,
          facebook,
          email,
          cidade,
          uf,
          whatsapp,
          preco,
          idInstrumento,
          idCategoria,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
          },
        }
      );
      navigation.navigate("Login");

      navigation.reset({
        index: 0,
        routes: [{ nome: "MyTabs" }],
      });
    } catch (error) {
      Alert.alert("Erro ao criar um Usuario", error);
    }
  };

  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      return cleaned
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };


  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 70 }}>
          <View style={{ alignItems: "center" }}>

            {/* <Avatar.Image
              size={50}
              source={users.foto ? { uri: users.foto } : require("../asset/avatar.png")}
              style={{ alignSelf: "flex-start" }}
            /> */}

            <View style={{ flexDirection: "row", gap: 5 }}>
              <TextInput
                style={[styles.inputLogin, { width: "73%" }]}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#ccc"
              />

              <TextInput
                style={[styles.inputLogin, { width: "27%" }]}
                placeholder="Sua Idade"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                maxLength={2}
                value={idade}
                onChangeText={setIdade}
              />
            </View>

            <View style={{ gap: 8, marginBlock: 4, flexDirection: "row" }}>
              <DropdownModal
                label="Selecione um estilo musical"
                options={categoriaOptions}
                selectedValue={idCategoria}
                onValueChange={(value) => updateField("idCategoria", value)}
              />

              <DropdownModal
                label="Selecione um instrumento"
                options={instrumentoOptions}
                selectedValue={idInstrumento}
                onValueChange={(value) => updateField("idInstrumento", value)}
              />
            </View>

            <TextInput
              style={styles.inputLogin}
              placeholder="Seu E-mail"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
            />

            <View style={{ gap: 8, marginBlock: 4, flexDirection: "row" }}>
              <TextInput
                style={[styles.inputLogin, { width: "50%" }]}
                placeholder="Digite Seu @ do Instagram"
                placeholderTextColor="#ccc"
                value={instagram}
                onChangeText={setInstagram}
              />
              <TextInput
                style={[styles.inputLogin, { width: "50%" }]}
                placeholder="Digite Seu whatsapp"
                placeholderTextColor="#ccc"
                keyboardType="phone-pad"
                value={whatsapp}
                onChangeText={setWhatsapp}
              />
            </View>

            <View style={{ gap: 8, marginBlock: 4, flexDirection: "row" }}>
              <TextInput
                style={[styles.inputLogin, { width: "70%" }]}
                placeholder="Digite seu facebook "
                placeholderTextColor="#ccc"
                value={facebook}
                onChangeText={setFacebook}
              />
              <TextInput
                style={[styles.inputLogin, { width: "30%" }]}
                placeholder="Preço"
                placeholderTextColor="#ccc"
                keyboardType="phone-pad"
                value={preco}
                onChangeText={setPreco}
              />
            </View>

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
              onPress={Register}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>
                Editar perfil{" "}
              </Text>
            </Pressable>
            <View style={{ flexDirection: "row", paddingTop: 8 }}>
              <Text style={{ fontSize: 14, marginTop: 16, fontWeight: 400 }}>
                Quer Mudar a senha?
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: 15,
                  marginTop: 16,
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
                onPress={() => navigation.navigate("Change Password")}
              >
                Senha
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
