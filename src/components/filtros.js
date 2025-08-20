import React, { useState, useEffect } from "react"
import { View, Text, TextInput } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Button, IconButton } from "react-native-paper"
import styles from "../components/Style"
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler"
import CardCategory from "../components/CardCategory"
import axios from "axios"
import CardUsersList from "../components/CardUsersList"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { parse } from "date-fns"


export default function Category({ navigation, route }) {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])

    const [instrumento, setInstrumento] = useState("")
    const [cidade, setCidade] = useState("")
    const [valorMin, setValorMin] = useState("")
    const [valorMax, setValorMax] = useState("")
    const [genero, setGenero] = useState("")
    const [uf, setUf] = useState("")
    const [valorFiltrado, setValorFiltrado] = useState([])

    const isFocused = useIsFocused()


    useEffect(() => {
        if (isFocused)
            clearAll()
        pegarValores()
        LoadingUsers()
    }, [isFocused])


    useEffect(() => {
        if (users.length > 0) {
            FiltrarValor()
        }
    }, [users, cidade, uf, valorMin, valorMax, genero, instrumento]);


    const pegarValores = async () => {
        try {
            setInstrumento(await AsyncStorage.getItem("instrumento"))
            setCidade(await AsyncStorage.getItem("cidade"))
            setUf(await AsyncStorage.getItem("uf"))
            setValorMax(await AsyncStorage.getItem("valorMax"))
            setValorMin(await AsyncStorage.getItem("valorMin"))
            setGenero(await AsyncStorage.getItem("genero"))
        } catch (erro) {
            console.log("Tipo do erro", erro);
        }
    }


    const LoadingUsers = async () => {
        try {
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
            setUsers(res.data)
        } catch (error) {
            Alert.alert("ERROR", error)
        }

    }

    let usuarios = users

    const FiltrarValor = () => {
        if (cidade !== null) {
            usuarios = usuarios.filter(user => user?.cidade == cidade)
            console.log("Passou 1")
        }

        if (uf !== null) {
            usuarios = usuarios.filter(user => user?.uf == uf)
            console.log("Passou 2")
        }

        if (valorMax !== null) {
            usuarios = usuarios.filter(user => parseFloat(user?.preco) <= parseFloat(valorMax))
            console.log("Passou 3")
        }

        if (valorMin !== null) {
            usuarios = usuarios.filter(user => parseFloat(user?.preco) >= parseFloat(valorMin))
            console.log("Passou 4")
        }

        if (genero !== null) {
            usuarios = usuarios.filter(user => user?.categoria?.generoMusical == genero)
            console.log("Passou 5")
        }

        if (instrumento !== null) {
            usuarios = usuarios.filter(user => user?.instrumento?.nomeInstrumento == instrumento)
            console.log("Passou 6")
        }

        setValorFiltrado(usuarios)

    }

    // console.log("Esse é o valor filtrado", valorFiltrado);


    const FilterUsers = valorFiltrado.filter(user => {
        return user?.nome?.toLowerCase().includes(search.toLowerCase())
    })


    const clearAll = async () => {
        try {
            setInstrumento(null)
            setCidade(null)
            setUf(null)
            setValorMax(null)
            setValorMin(null)
            setGenero(null)
        } catch (erro) {
            console.log("Tipo do erro", erro);
        }
    }

    const arrayFiltros = [
        cidade, valorMax, valorMin, uf, genero, instrumento
    ]

    const teste = async (item) => {
        const valorChave = await AsyncStorage.multiGet(["valorMax", "valorMin", "instrumento", "genero", "cidade", "uf"])
        valorChave.map(async ([key, value]) => {
            if (value == item) {
                await AsyncStorage.removeItem(key)
            }
        })
    }



    return (

        <View style={styles.container}>

            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 12 }}>

                <TextInput style={styles.input} placeholder="Search Free Lance" value={search} onChangeText={setSearch} />
                <IconButton style={styles.filter} icon="text-search" size={30} onPress={() => navigation.navigate("Filters")} />
            </View>


            <View style={styles.space} >
                <Text > Todos os Músicos </Text>
                <Pressable onPress={clearAll}><Text>Limpar tudo</Text></Pressable>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    {arrayFiltros !== null ? null :
                        arrayFiltros.map(item, index => {
                            if (item !== null) {
                                return (
                                    <Pressable key={index} onPress={() => teste(item)}><Text>{item}</Text></Pressable>
                                )
                            } else {
                                return null
                            }
                        })}
                </View>

            </View>


            <FlatList
                data={FilterUsers}

                keyExtractor={(item) => item.idUsuario.toString()}

                renderItem={({ item }) => (
                    <CardUsersList
                        item={item}
                    />
                )}
            />
        </View>
    )
}