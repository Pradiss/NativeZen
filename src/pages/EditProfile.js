import React, { useEffect, useState } from "react";
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
import { apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DropdownModal } from "../components/Modal";
import {
  categoriaOptions,
  getCategoriaLabel,
  getInstrumentoLabel,
  instrumentoOptions,
} from "../utils/ArraysCategory";
import { formatReaisInput, formatReaisInteiro } from "../utils/mask";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [idade, setIdade] = useState("");
  const [uf, setUf] = useState("");
  const [cidade, setCidade] = useState("");
  const [preco, setPreco] = useState("");
  const [idInstrumento, setIdInstrumento] = useState("");
  const [idCategoria, setIdCategoria] = useState("");

  useEffect(() => {
    const userData = async () => {
      const api = await AsyncStorage.getItem("api_token");
      const idUsuario = await AsyncStorage.getItem("idUsuario");

      try {
        const res = await apiUsers.get(`/${idUsuario}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api}`,
          },
        });
        setNome(res.data.nome);
        setEmail(res.data.email);
        setInstagram(res.data.instagram);
        setCidade(res.data.cidade);
        setFacebook(res.data.facebook);
        setPreco(res.data.preco.toString());
        setWhatsapp(res.data.whatsapp.toString());
        setUf(res.data.uf);
        setIdade(res.data.idade.toString());
        setIdCategoria(res.data.idCategoria.toString());
        setIdInstrumento(res.data.idInstrumento.toString());
      } catch (e) {
        Alert.alert("Deu erro", e.message);
      }
    };
    userData();
  }, []);

  const EditProfile = async () => {
    const api = await AsyncStorage.getItem("api_token");
    const idUsuario = await AsyncStorage.getItem("idUsuario");

    try {
      const precoNumber = Number(preco.replace(/\D/g, '')) || 0;

      await apiUsers.put(
        `${idUsuario}`,
        {
          nome,
          idade,
          instagram,
          facebook,
          email,
          cidade,
          uf,
          whatsapp,
          preco: precoNumber,
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

      navigation.navigate("MainTabs", { screen: "Profile" });
    } catch (error) {
      Alert.alert("Erro ao editar um usuario", error.message);
    }
  };

  const validarForm = () => {
    if (!nome.trim()) {
      Alert.alert("Campo Obrigatório", "O nome é obrigatorio");
      return false;
    }
    if (!idade || isNaN(idade) || idade < 1 || idade > 99) {
      Alert.alert("Campo Obrigatório", "A idade é obrigatório");
      return false;
    }
    if (!cidade.trim()) {
      Alert.alert("Campo Obrigatório", "A cidade é obrigatório");
      return false;
    }
    if (!uf.trim()) {
      Alert.alert("Campo Obrigatório", "O estado é obrigatório");
      return false;
    }
    if (!idCategoria.trim()) {
      Alert.alert("Campo Obrigatório", "O estilo musical é obrigatório");
      return false;
    }
    if (!idInstrumento.trim()) {
      Alert.alert("Campo Obrigatório", "O Instrumento musical é obrigatório");
      return false;
    }
    if (!whatsapp.trim()) {
      Alert.alert("Campo Obrigatório", "Seu Numero é obrigatório");
      return false;
    }

    if (!email.trim()) {
      Alert.alert("Campo Obrigatório", "seu E-mail é obrigatório");
      return false;
    }

    if (!preco.trim()) {
      Alert.alert("Campo Obrigatório", "Seu preço é obrigatório");
      return false;
    }

    return true;
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 70 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
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

          <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
            <TextInput
              style={[styles.inputLogin, { width: "73%" }]}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Digite sua Cidade"
              placeholderTextColor="#ccc"
            />

            <TextInput
              style={[styles.inputLogin, { width: "27%" }]}
              placeholder="Sua Idade"
              placeholderTextColor="#ccc"
              maxLength={2}
              value={uf}
              onChangeText={setUf}
            />
          </View>

          <View
            style={{
              gap: 8,
              marginBlock: 4,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <DropdownModal
              label="Selecione um estilo musical"
              options={categoriaOptions}
              selectedValue={idCategoria}
              onValueChange={setIdCategoria}
            />

            <DropdownModal
              label="Selecione um instrumento"
              options={instrumentoOptions}
              selectedValue={idInstrumento}
              onValueChange={setIdInstrumento}
            />
          </View>

          <TextInput
            style={[styles.inputLogin, { marginBottom: 10 }]}
            placeholder="Seu E-mail"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
          />

          <View
            style={{
              gap: 8,
              marginBlock: 2,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
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

          <View style={{ gap: 8, flexDirection: "row", marginBottom: 10 }}>
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
              keyboardType="numeric"
              value={preco}
              onChangeText={(text) => setPreco(formatReaisInteiro(text))}
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
            onPress={() => {
              if (validarForm()) {
                EditProfile();
              }
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>Editar perfil </Text>
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
    </KeyboardAvoidingView>
  );
}
