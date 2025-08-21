import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import styles from "../components/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";

import { useRef } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const senhaInputRef = useRef();

  const handleLogin = async () => {
     if (!email && !senha) {
      Alert.alert("Campos obrigatórios", "Preencha e-mail e senha.");
      return;
    }

    try {
      const res = await axios.post(
        "https://erick5457.c44.integrator.host/api/login",
        { email, senha },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = res.data.token;
      const idUsuario = res.data?.usuario?.idUsuario;

      await AsyncStorage.setItem("token", token);      
      await AsyncStorage.setItem("idUsuario", idUsuario.toString());

      // reset
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          Alert.alert("Falha no login", "E-mail ou senha incorretos.")
        }else{
          Alert.alert("Falha no login ", 
            error.response.data.message || error.message
          )
        }
      }else if (error.request){
        Alert.alert("Falha no login", "Servidor não respondeu. Tente novamente Mais Tarde")
      }else{
        Alert.alert("Falha no login ", error.message)
      }
      

    }
  };

      
  const validarForm = () => {
   
      
   
   

    return true
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        justifyContent: "center",
        alignContent: "center",
        padding: 32,
        flex: 1,
        backgroundColor: "#232323",
      }}
    >
      
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../asset/logoZene.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
        

          <Text
            style={{
              marginBottom: 16,
              color: "white",
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            Faça login para continuar
          </Text>
          <Text
            style={{
              marginBottom: 32,
              color: "white",
              fontWeight: 400,
              fontSize: 18,
              textAlign:"center",
              
            }}
          >
            Entre no Zene e se conecte com oportunidades no ritmo da sua arte.
          </Text>
      

          <TextInput
            style={styles.inputLogin}
            value={email}
            placeholder="Seu E-mail"
            placeholderTextColor="#ccc"
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => senhaInputRef.current?.focus()}
          />

          <TextInput
            placeholderTextColor="#ccc"
            style={styles.inputLogin}
            value={senha}
            placeholder="Sua Senha"
            secureTextEntry={true} // hide password
            onChangeText={setSenha}
            onSubmitEditing={handleLogin}
          />
          {senha.length > 0 && senha.length < 6 && (
            <Text style={{ color: "#6BD2D7", marginBottom: 8 }}>
              A senha deve conter no mínimo 6 caracteres
            </Text>
          )}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.buttonLogin}
            icon="arrow-right"
            contentStyle={{
              flexDirection: "row-reverse",
            }}
            labelStyle={{ color: "#000", fontSize: 18 }}
          >
            Começar
          </Button>

          {/* <Text style={{color:"#fff",fontSize:14, marginTop:40, fontWeight:500}}>
                Or continue with</Text>


            <Button
            icon={() => (<MaterialCommunityIcons name="google" size={20} color="#fff" />)}
            mode="contained"
            style={{
                borderRadius:30,
                width:"100%",
                marginTop: 16,
                backgroundColor: "#000",
                borderWidth: 0.50,
                padding:8,
                borderColor: "#fff"
            }}
            textColor="#fff"
            >
            Login with Google
            </Button> */}

          <View style={{ flexDirection: "row", paddingTop: 14 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 14,

                fontWeight: 400,
              }}
            >
              Não tem uma conta?
            </Text>
            <Text
              style={{
                color: "#6BD2D7",
                fontSize: 15,

                fontWeight: 400,
              }}
              onPress={() => navigation.navigate("ScreenInicial")}
            >
              {" "}
              Cadastre-se aqui!
            </Text>
          </View>

          <Image
            source={require("../asset/logoZene.png")}
            style={{ width: 90, height: 40, marginTop: 32 }}
            resizeMode="contain"
          />

          {/* <Text  
            style={{color:"#fff", fontSize:19}}onPress={() => navigation.navigate("MainTabs")}>
                Skip <MaterialCommunityIcons color="#fff" name ="arrow-right" size={17}/>
            </Text> */}
        </View>
      
    </KeyboardAvoidingView>
  );
}
