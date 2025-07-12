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
    ScrollView,

} from "react-native";
import styles from "../components/Style";
import { Button } from "react-native-paper";

import { formatCEP, formatPhone, formatN, isEmailValid, formatUF } from "../utils/mask";
import { apiRegister } from "../service.js/Api";

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
        cep: "",
        idInstrumento: "",
        idCategoria: "",

    });

    const Register = async () => {
        try {
            const response = await apiRegister.post(
                "/",
                { ...formData },

                {
                    headers: {
                        "Content-Type": "application/json",
                    }
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
                )
                const data = await response.json();

                if (!data.erro) {
                    updateField("descricao", data.logradouro)
                    updateField("cidade", data.localidade)
                    updateField("location", data.bairro)
                    updateField("uf", data.uf)
                }
            } catch (erro) {
                console.warn("Erro ao consultar CEP:", erro)
            }
        }
    }

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
                        <TextInput
                            style={styles.inputLogin}
                            value={formData.nome}
                            onChangeText={(valor) => updateField("nome", valor)}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#ccc"
                        />

                        <TextInput
                            style={styles.inputLogin}
                            placeholder="Digite sua Idade"
                            placeholderTextColor="#ccc"
                            keyboardType="numeric"
                            value={formData.idade}
                            onChangeText={(text) => updateField("idade", text)}
                        />
                        <TextInput
                            style={styles.inputLogin}
                            placeholder="WhatsApp"
                            placeholderTextColor="#ccc"
                            keyboardType="phone-pad"
                            value={formData.whatsapp}
                            onChangeText={(text) => updateField("phone", formatPhone(text))}
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
                            }} // já busca endereço
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <View style={{ flexDirection: "row", gap: 12 }}>
                        </View>

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
            case 4:
                return (
                    <>
                        <TextInput
                            placeholder="Coloque seu preço do Free lance"
                            placeholderTextColor="#ccc"
                            onChangeText={(text) => updateField("preco", formatN(text))}
                            keyboardType="numeric"
                            style={[styles.input, { width: "25%" }]}
                            value={formData.preco}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fale um pouco de Voce"
                            placeholderTextColor="#ccc"
                            value={formData.descricao}
                            onChangeText={(text) => updateField("descricao", text)}
                        />
                    </>
                );
            case 5:
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
            case 6:
                return (
                    <>
                        <View style={{ paddingBlock: 8, paddingBottom: 12 }}>

                            <Text style={{ color: "#fff", fontWeight: "bold", marginBottom: 12, fontSize: 24 }}>
                                Confirme seus dados:
                            </Text>
                            <Text style={styles.textRegister}>
                                Nome: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.nome}</Text>
                            </Text>
                            <Text style={styles.textRegister}>
                                Cpf: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.idade}</Text>
                            </Text>
                            <Text style={styles.textRegister}>
                                Telefone: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.phone}</Text>
                            </Text>
                            <Text style={styles.textRegister}>
                                CEP: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.cep}</Text>
                            </Text>
                            <Text style={styles.textRegister}>
                            </Text>
                            <Text style={styles.textRegister} senha>
                                Bairro: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.location}</Text>
                            </Text>
                            Rua: <Text style={{ color: '#34E167', fontWeight: 400, }}>{formData.descricao}, Nº {formData.preco}</Text>
                            Cidade: <Text style={{ color: '#34E167', fontWeight: 400, }}> {formData.cidade} - {formData.uf}</Text>
                            <Text style={styles.textRegister}>
                            </Text>
                            <Text style={styles.textRegister}>
                                País: <Text style={{ color: '#34E167', fontWeight: 400, }}> {formData.country}</Text>
                            </Text>
                            <Text style={styles.textRegister}>
                                E-mail: <Text style={{ color: '#34E167', fontWeight: 400, }}> {formData.email}</Text>
                            </Text>


                        </View>
                    </>
                );
            default:
                return null;
        }
    };

    // #34E167 color verder
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ padding: 16, justifyContent: "flex-end", flex: 1, backgroundColor: "#232323" }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <Image
                        source={require("../asset/BackgroundScreen.png")}
                        style={{ width: 350, height: 150, marginBlock: 32 }}
                        resizeMode="contain"
                    />
                    <Text style={{ marginBottom: 16, color: "white", fontSize: 20 }}>Faça seu cadastro aqui na zene</Text>
                    <View
                        style={{
                            borderBottomColor: "#ccc",
                            borderBottomWidth: 1,
                            marginBottom: 18,
                        }}
                    />
                    <View>{steps()}</View>

                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        {step > 1 && (
                            <Button
                                mode="contained"
                                onPress={() => setStep((s) => s - 1)}
                                style={{ backgroundColor: "trasnparent", width: "30%", padding: 4, }}
                                labelStyle={{ color: "#fff", textDecorationLine: "underline" }}
                            >
                                Voltar
                            </Button>
                        )}
                        {step < 6 && (
                            <Button
                                mode="contained"
                                onPress={() => setStep((s) => s + 1)}
                                style={{ backgroundColor: "#6BD2D7", width: "50%", padding: 4, marginBlock: 16 }}
                                labelStyle={{ color: "#000" }}
                            >
                                Avançar
                            </Button>
                        )}
                        {step === 6 && (
                            <Button
                                mode="contained"
                                onPress={Register}
                                disabled={!isEmailValid(formData.email) || formData.senha.length < 6}

                                style={{ width: "50%", padding: 4, backgroundColor: "#6BD2D7", marginBlock: 16 }}
                                labelStyle={{ color: "#000" }}
                            >
                                Enviar
                            </Button>
                        )}


                    </View>
                    <View style={{ flexDirection: "row", paddingTop: 8, alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ fontSize: 14, color: "#fff", marginTop: 16, fontWeight: 400 }}>
                            Já tem uma conta?
                        </Text>
                        <Text
                            style={{
                                color: "#6BD2D7",
                                fontSize: 15,
                                marginTop: 16,
                                fontWeight: 500,
                                textDecorationLine: "underline",
                            }}
                            onPress={() => navigation.navigate("Login")}
                        > Login
                        </Text>
                    </View>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginBlock: 12 }}>
                        <Image
                            source={require("../asset/logoZene.png")}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />

                    </View>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
