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
import { formatPhone } from "../utils/mask";
import { cleanPhone } from "../utils/mask";

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

  useEffect(()=>{
    const userData = async () =>{
      const api = await AsyncStorage.getItem("api_token")
      const idUsuario = await AsyncStorage.getItem("idUsuario")

      try{
        const res = await apiUsers.get(
          `/${idUsuario}`,
          {
            headers:{
              "Content-Type" : "application/json",
              "Authorization" : `Bearer ${api}`
            }
          })
        setNome(res.data.nome)
        setEmail(res.data.email)
        setInstagram(res.data.instagram)
        setCidade(res.data.cidade)
        setFacebook(res.data.facebook)
        setPreco(res.data.preco.toString())
        setWhatsapp(formatPhone(res.data.whatsapp));
        setUf(res.data.uf)
        setIdade(res.data.idade.toString())
        setIdCategoria(res.data.idCategoria.toString())
        setIdInstrumento(res.data.idInstrumento.toString())
        
      }catch(e){
        Alert.alert("Deu erro",e.message)
      }
    }
    userData()
  },[])

  const EditProfile = async () => {
    const api = await AsyncStorage.getItem("api_token");
    const idUsuario = await AsyncStorage.getItem("idUsuario");
    try {
        const response = await apiUsers.put(
          `${idUsuario}`,
          {
            nome,
            idade,
            instagram,
            facebook,
            email,
            cidade,
            uf,
            whatsapp: cleanPhone(whatsapp),
            preco,
            idInstrumento,
            idCategoria,
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
        Alert.alert("Erro ao criar um Usuario", error)
      }
    }
  


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
            <View style={{ flexDirection: "row", gap: 5 }}>
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

            <View style={{ gap: 8, marginBlock: 4, flexDirection: "row" }}>
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
              style={styles.inputLogin}
              placeholder="Seu E-mail"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
            />

            <View style={{ gap: 8, marginBlock: 2, flexDirection: "row" }}>
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

            <View style={{ gap: 8, flexDirection: "row" }}>
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
              onPress={EditProfile}
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
      
    </KeyboardAvoidingView>
  );
}
