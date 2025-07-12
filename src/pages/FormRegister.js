import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal
} from "react-native";
import styles from "../components/Style";
import { Button } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { DropdownModal } from "../components/Modal";

import {
  formatCEP,
  formatPhone,
  formatN,
  isEmailValid,
  formatUF,
  formatMoney,
} from "../utils/mask";
import { apiRegister } from "../service.js/Api";
import { categoriaOptions, getCategoriaLabel, getInstrumentoLabel, instrumentoOptions } from "../utils/ArraysCategory";

export default function FormRegister({ navigation }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    foto: "",
    idade: "",
    descricao: "",
    instagram: "",
    facebook: "",
    email: "",
    senha: "",
    cidade: "",
    uf: "",
    whatsapp: "",
    preco: "",
    
    idInstrumento: "",
    idCategoria: "",
  });
  const [showDropDown,setShowDropDown] = useState(false)

  const Register = async () => {
    if (!formData.nome || !formData.idCategoria || !formData.idInstrumento) {
        Alert.alert("Preencha todos os campos obrigatórios");
        return;
        }
    try {
      const response = await apiRegister.post(
        "/",
        { ...formData },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro ao criar um Usuario", error);
    }
  };

  const cepChange = async (cepValue) => {
    updateField("cep", cepValue);

    const rawCep = cepValue.replace(/\D/g, ""); // remove máscara

    if (rawCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${rawCep}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          updateField("cidade", data.localidade);
          updateField("uf", data.uf);
        }
      } catch (erro) {
        console.warn("Erro ao consultar CEP:", erro);
      }
    }
  };

  const nextPass = () => {
    if (step < 4) setStep(step + 1);
  };
  const passBefore = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const confirm = () => {
    console.log("Dados enviado", formData);
    Alert.alert("Formulario enviado com sucesso ");
  };

  const steps = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TextInput
                style={[styles.inputLogin, { width: "72%" }]}
                value={formData.nome}
                onChangeText={(valor) => updateField("nome", valor)}
                placeholder="Digite seu nome"
                placeholderTextColor="#ccc"
              />

              <TextInput
                style={[styles.inputLogin, { width: "27%" }]}
                placeholder="Idade"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                maxLength={2}
                value={formData.idade}
                onChangeText={(text) => updateField("idade", text)}
              />
            </View>
            
            <View style={{ gap:8 ,marginBlock:4 }}> 
                <DropdownModal
                    label="Selecione um estilo musical"
                    options={categoriaOptions}
                    selectedValue={formData.idCategoria}
                    onValueChange={(value) => updateField("idCategoria", value)}
                />

                <DropdownModal
                    label="Selecione um instrumento"
                    options={instrumentoOptions}
                    selectedValue={formData.idInstrumento}
                    onValueChange={(value) => updateField("idInstrumento", value)}
                />
            </View>

            
            <TextInput
               placeholder="Quanto você cobra pelo seu trabalho musical?"
               placeholderTextColor="#ccc"
               value={formData.preco}
               onChangeText={(text) => updateField("preco", formatMoney(text))}
               keyboardType="numeric"
               maxLength={10}
               style={styles.inputLogin}
             />
          </>
        );
      case 2:
        return (
          <>
          <TextInput
              style={styles.inputLogin}
              placeholder="Digite seu CEP"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={formData.cep}
              onChangeText={(text) => {
                const masked = formatCEP(text);
                cepChange(masked);
              }} 
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Digite sua Cidade"
              value={formData.cidade}
              placeholderTextColor="#ccc"
              onChangeText={(text) => updateField("cidade", text)}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Seu Estado Ex: SP"
              placeholderTextColor="#ccc"
              value={formData.uf}
              maxLength={2}
              onChangeText={(text) => updateField("uf", formatUF(text))}
            />
            
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              style={styles.inputLogin}
              placeholder="WhatsApp Ex: (19) 99090-9090"
              placeholderTextColor="#ccc"
              keyboardType="phone-pad"
              value={formData.whatsapp}
              onChangeText={(text) => updateField("whatsapp", formatPhone(text))}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Seu @ do Instagram"
              placeholderTextColor="#ccc"
              value={formData.instagram}
              onChangeText={(text) => updateField("instagram",text)}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Seu perfil do Facebook"
              placeholderTextColor="#ccc"
              value={formData.facebook}
              onChangeText={(text) => updateField("facebook",text)}
            />
          </>
        );
        // case 4:
        // return (
        //   <>
        //     <TextInput
        //       style={styles.inputLogin}
        //       placeholder="Coloque sua Foto aqui "
        //       placeholderTextColor="#ccc"
        //       value={formData.foto}
        //       onChangeText={(text) => updateField("foto", text)}
        //     />

        //     <TextInput
        //       placeholder="Coloque seu preço do Free lance"
        //       placeholderTextColor="#ccc"
        //       value={formData.preco}
        //       onChangeText={(text) => updateField("preco", formatN(text))}
        //       keyboardType="numeric"
        //       style={styles.inputLogin}
        //     />
        //   </>
        // );
      case 4:
        return (
          <>
            <TextInput
              style={styles.inputLogin}
              placeholder="Digite seu E-mail"
              placeholderTextColor="#ccc"
              value={formData.email}
              onChangeText={(text) => updateField("email", text)}
            />
            <TextInput
              style={styles.inputLogin}
              placeholder="Digite sua Senha"
              placeholderTextColor="#ccc"
              value={formData.senha}
              secureTextEntry
              onChangeText={(text) => updateField("senha", text)}
            />
            {formData.senha.length > 0 && formData.senha.length < 6 && (
              <Text style={{ color: "red", marginBottom: 8 }}>
                A senha deve conter no mínimo 6 caracteres
              </Text>
            )}
          </>
        );
      case 5:
        return (
          <>
            <View style={{ paddingBlock: 8, paddingBottom: 12 }}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginBottom: 12,
                  fontSize: 24,
                }}
              >
                Confirme seus dados:
              </Text>

              <Text style={styles.textRegister}>
                Nome:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.nome}
                </Text>
              </Text>

              <Text style={styles.textRegister}>
                Idade:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.idade}
                </Text>
              </Text>

               <Text style={styles.textRegister}>
                Categoria:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {getCategoriaLabel(formData.idCategoria)}
                </Text>
              </Text>

               <Text style={styles.textRegister}>
                Instrumento:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {getInstrumentoLabel(formData.idInstrumento)}
                </Text>
              </Text>

              <Text style={styles.textRegister}>
                Instagram:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.instagram}
                </Text>
              </Text>

              <Text style={styles.textRegister}>
                WhatsApp:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formatPhone(formData.whatsapp)}
                </Text>
              </Text>


              <Text style={styles.textRegister}>
                Facebook:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.facebook}
                </Text>
              </Text>

              <Text style={styles.textRegister}>
                Cidade:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.cidade}
                </Text>
              </Text>
              <Text style={styles.textRegister}>
                Estado:
                <Text style={{ color: "#6BD2D7", fontWeight: 400,  }}>
                 {formData.uf}
                </Text>
              </Text>
              <Text style={styles.textRegister}>
                Preço:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.preco}
                </Text>
              </Text>

              <Text style={styles.textRegister}>
                E-mail:
                <Text style={{ color: "#6BD2D7", fontWeight: 400 }}>
                  {formData.email}
                </Text>
              </Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  // #6BD2D7 cor padrão de azul
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        padding: 16,
        justifyContent: "flex-end",
        flex: 1,
        backgroundColor: "#232323",
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView>
          <Image
            source={require("../asset/BackgroundScreen.png")}
            style={{ width: "100%", height: 190, marginBlock: 32 }}
            resizeMode="contain"
          />

          
          {step === 1 && (
            <View style={{marginBlock:16}}>
              <Text style={{color: "white", fontWeight: 600,fontSize: 20,}}>
                Quem é você na música?
              </Text>

              <Text style={{marginTop:16,color: "white",fontSize: 16, fontWeight: 400,}}>
                Nos conte o básico sobre você e sua arte. Esse é o primeiro
                passo para estar visível no app!
              </Text>
            </View>
          )}

          {step === 2 && (
            <View style={{marginBlock:16}}>
              <Text style={{color: "white", fontWeight: 600,fontSize: 20,}}>
                Onde você mora atualmente?
              </Text>
              
              <Text style={{marginTop:16,color: "white",fontSize: 16, fontWeight: 400,}}>
                Essas informações ajudam quem está procurando músicos como você na sua região.
              </Text>
            </View>
          )}

          {step === 3 && (
            <View style={{marginBlock:16}}>
              <Text style={{color: "white", fontWeight: 600,fontSize: 20,}}>
                Como as pessoas podem falar com você?
              </Text>
              
              <Text style={{marginTop:16,color: "white",fontSize: 16, fontWeight: 400,}}>
                Adicione seus contatos e redes para fechar mais trabalhos.
              </Text>
            </View>
          )}

          {step === 4 && (
            <View style={{marginBlock:16}}>
              <Text style={{color: "white", fontWeight: 600,fontSize: 20,}}>
                Agora só falta criar sua conta
              </Text>
              
              <Text style={{marginTop:16,color: "white",fontSize: 16, fontWeight: 400,}}>
                Cadastre seu e-mail e senha para entrar no app sempre que quiser atualizar seu perfil ou responder pedidos.
              </Text>
            </View>
          )}

           
           <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginBottom: 16,
            }}
          /> 
          <View>{steps()}</View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {step > 1 && (
              <Button
                mode="contained"
                onPress={() => setStep((s) => s - 1)}
                style={{
                  backgroundColor: "trasnparent",
                  width: "30%",
                  padding: 4,
                }}
                icon="arrow-left"
                contentStyle={{
                  flexDirection: "row",
                }}
                labelStyle={{ color: "#fff", textDecorationLine: "underline" }}
              >
                Voltar
              </Button>
            )}
            {step < 5 && (
              <Button
                mode="contained"
                onPress={() => setStep((s) => s + 1)}
                style={{
                  backgroundColor: "#6BD2D7",
                  width: "50%",
                  padding: 4,
                  marginBlock: 16,
                }}
                icon="arrow-right"
                contentStyle={{
                  flexDirection: "row-reverse",
                }}
                labelStyle={{ color: "#000" }}
              >
                Avançar
              </Button>
            )}
            {step === 5 && (
              <Button
                mode="contained"
                onPress={Register}
                disabled={
                  !isEmailValid(formData.email) || formData.senha.length < 6
                }
                style={{
                  width: "50%",
                  padding: 4,
                  backgroundColor: "#6BD2D7",
                  marginBlock: 16,
                }}
                icon="arrow-right"
                contentStyle={{
                  flexDirection: "row-reverse",
                }}
                labelStyle={{ color: "#000" }}
              >
                Enviar
              </Button>
            )}
          </View>
          
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <View
            style={{
              flexDirection: "row",
              paddingTop: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 32,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#fff",
                fontWeight: 400,
              }}
            >
              Já tem uma conta?
            </Text>
            <Text
              style={{
                color: "#6BD2D7",
                fontSize: 15,
                fontWeight: 500,
                textDecorationLine: "underline",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              Login
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
             
            }}
          >
            
          </View>
    </KeyboardAvoidingView>
  );
}
