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
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import styles from "../components/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DropdownModal } from "../components/Modal";
import {
  categoriaOptions,
  getCategoriaLabel,
  getInstrumentoLabel,
  instrumentoOptions,
} from "../utils/ArraysCategory";

const Filtros = ({ navigation, route }) => {
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [idInstrumento, setIdInstrumento] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  AsyncStorage.setItem("valorMax", precoMax.toString());
  AsyncStorage.setItem("valorMin", precoMin.toString());
  AsyncStorage.setItem("instrumento", idInstrumento.toString());
  AsyncStorage.setItem("genero", idCategoria.toString());
  AsyncStorage.setItem("cidade", cidade.toString());
  AsyncStorage.setItem("uf", uf.toString());



  return (
    <View>
      <View style={{ padding: 16, gap: 8 }}>
        {/* <TextInput
          style={[styles.input, { width: "100%" }]}
          value={idInstrumento}
          onChangeText={setInstrumento}
          placeholder="Escolha o instrumento "
          keyboardType="default"
        /> */}
        <View style={{ flexDirection: "row", gap: 8 }}>
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
        {/* <TextInput
          style={[styles.input, { width: "100%" }]}
          value={genero}
          onChangeText={setGenero}
          placeholder="Coloque o estilo Musical"
          keyboardType="default"
        /> */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            style={[styles.input, {width:"60%"}]}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Coloque cidade"
            keyboardType="default"
          />
          <TextInput
            style={[styles.input, { width: "38%" }]}
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            onChangeText={(text) => setUf(text.toUpperCase())}
            placeholder="Estado Ex: SP,RJ"
            keyboardType="default"
          />
        </View>
        <TextInput
          style={[styles.input, { width: "100%" }]}
          value={precoMax}
          onChangeText={setPrecoMax}
          placeholder="Coloque o preco maximo"
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { width: "100%" }]}
          value={precoMin}
          onChangeText={setPrecoMin}
          placeholder="Coloque o preco minimo"
          keyboardType="numeric"
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
          onPress={() => navigation.navigate("MainTabs", { screen: "Explore" })}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Filtrar </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Filtros;
