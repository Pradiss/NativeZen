
import React,{useState,useEffect} from "react"
import { View, Text, TextInput, FlatList, Image, Alert, Pressable ,TouchableWithoutFeedback, Keyboard } from "react-native"
import { Button , IconButton} from "react-native-paper"
import styles from "../components/Style"
import AsyncStorage from "@react-native-async-storage/async-storage"


const Filtros = ({navigation, route}) =>{
    
    const [precoMin, setPrecoMin] = useState("")
    const [precoMax, setPrecoMax] = useState("")
    const [instrumento, setInstrumento] = useState("")
    const [genero, setGenero] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")

    
        AsyncStorage.setItem("valorMax", precoMax.toString())
        AsyncStorage.setItem("valorMin", precoMin.toString())
        AsyncStorage.setItem("instrumento", instrumento.toString())
        AsyncStorage.setItem("genero", genero.toString())
        AsyncStorage.setItem("cidade", cidade.toString())
        AsyncStorage.setItem("uf", uf.toString())


    console.log(precoMax);
    
    return(
        <View>
            <View>
                
                <TextInput  value={instrumento} onChangeText={setInstrumento} placeholder="Coloque o instrumento" keyboardType="default"/>
                <TextInput value={genero} onChangeText={setGenero} placeholder="Coloque o gênero" keyboardType="default"/>
                <TextInput value={cidade} onChangeText={setCidade} placeholder="Coloque cidade" keyboardType="default"/>
                <TextInput value={uf} onChangeText={setUf} placeholder="Coloque a uf" keyboardType="default"/>
                <TextInput value={precoMin} onChangeText={setPrecoMin} placeholder="Coloque o preco mínimo" keyboardType="numeric"/>
                <TextInput value={precoMax} onChangeText={setPrecoMax} placeholder="Coloque o preco máximo" keyboardType="numeric"/>
                
            </View>
            <Pressable onPress={() => navigation.navigate("MainTabs", {screen: "Category"})}><Text>Teste</Text></Pressable>
        </View>
    )

}

export default Filtros