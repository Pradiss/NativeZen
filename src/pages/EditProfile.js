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

export default function Register({ navigation }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [nome, setNome] = useState([]);
  const [phone, setPhone] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [street, setStreet] = useState([]);
  const [number, setNumber] = useState([]);
  const [location, setLocation] = useState([]);
  const [cep, setCep] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [country, setCountry] = useState([]);

  const Register = async () => {
    try {
      const response = await apiRegister.put(
        "/",
        {
          nome,
          email,
         
        },

        
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 70 }}>
          <View style={{ alignItems: "center" }}>
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
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </View>

            <TextInput
              style={styles.inputLogin}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
                placeholderTextColor="#888"
            />

            <TextInput
              style={styles.inputLogin}
              placeholder="Seu E-mail"
                placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
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
                     color: "white",
                   }}
                   onPress={Register}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}