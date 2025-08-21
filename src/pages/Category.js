import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Alert } from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Button, IconButton } from "react-native-paper"
import styles from "../components/Style"
import { FlatList } from "react-native-gesture-handler"
import CardUsersList from "../components/CardUsersList"
import { apiCategorias, apiInstrumento, apiUsers } from "../service.js/Api"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Category({ navigation }) {
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const [category, setCategory] = useState([])
  const [instrument, setInstrument] = useState([])
  const [filterCategory, setFilterCategory] = useState("")
  const [filterInstrument, setFilterInstrument] = useState("")

  const [cidade, setCidade] = useState(null)
  const [uf, setUf] = useState(null)
  const [genero, setGenero] = useState(null)
  const [valorMin, setValorMin] = useState(null)
  const [valorMax, setValorMax] = useState(null)
  const [instrumentoFiltro, setInstrumentoFiltro] = useState(null)

  const isFocused = useIsFocused()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    async function loadFiltersFromStorage() {
      setCidade(await AsyncStorage.getItem("cidade"))
      setUf(await AsyncStorage.getItem("uf"))
      setGenero(await AsyncStorage.getItem("genero"))
      setValorMin(await AsyncStorage.getItem("valorMin"))
      setValorMax(await AsyncStorage.getItem("valorMax"))
      setInstrumentoFiltro(await AsyncStorage.getItem("instrumento"))
    }

    if (isFocused) {
      loadFiltersFromStorage()
    }
  }, [isFocused])

  useEffect(() => {
    if (isFocused && !hasLoaded) {
      const loadAll = async () => {
        try {
          const [resUsers, resCategorias, resInstrumentos] = await Promise.all([
            apiUsers.get("/"),
            apiCategorias.get("/"),
            apiInstrumento.get("/")
          ])

          setUsers(resUsers.data)
          setCategory(resCategorias.data)
          setInstrument(resInstrumentos.data)
          setHasLoaded(true)
        } catch (error) {
          Alert.alert("Erro ao carregar dados", error.message || "Erro desconhecido")
        }
      }

      loadAll()
    }
  }, [isFocused, hasLoaded])

  
  const FilterUsers = (Array.isArray(users) ? users : []).filter((user) => {
    const termo = (search || "").toLowerCase()
    const nome = (user?.nome ?? "").toString().toLowerCase()
    const cidadeUser = (user?.cidade ?? "").toString().toLowerCase()

    
    const nameOrCity = !termo || nome.includes(termo) || cidadeUser.includes(termo)

    const filterCategoriaBtn = filterCategory ? user.idCategoria === filterCategory : true
    const filterInstrumentBtn = filterInstrument ? user.idInstrumento === filterInstrument : true

    const filterCidade = cidade ? user?.cidade === cidade : true
    const filterUf  = uf ? user?.uf === uf : true
    const filterGenero = genero ? user?.categoria?.generoMusical === genero : true
    const filterInstrumento = instrumentoFiltro ? user?.instrumento?.nomeInstrumento === instrumentoFiltro : true

    const precoNum = Number.isFinite(parseFloat(user?.preco)) ? parseFloat(user.preco) : null
    const filterPrecoMin = valorMin ? (precoNum !== null && precoNum >= parseFloat(valorMin)) : true
    const filterPrecoMax = valorMax ? (precoNum !== null && precoNum <= parseFloat(valorMax)) : true

    return (
      nameOrCity &&
      filterCategoriaBtn &&
      filterInstrumentBtn &&
      filterCidade &&
      filterUf &&
      filterGenero &&
      filterInstrumento &&
      filterPrecoMin &&
      filterPrecoMax
    )
  })

  return (
    <View style={{ paddingTop: 56, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 12,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Buscar Free Lances"
          value={search}
          onChangeText={setSearch}
        />
        <IconButton
          style={styles.filter}
          icon="text-search"
          size={30}
          onPress={() => navigation.navigate("Filters")}
        />
      </View>

      <View style={{ paddingStart: 8 ,gap:6 }}>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idCategoria.toString()}
          renderItem={({ item }) => (
            <Button
              mode="contained"
              style={{ margin: 4, backgroundColor: "#232323" }}
              onPress={() => setFilterCategory(item.idCategoria)}
            >
              {item.generoMusical}
            </Button>
          )}
        />

        <FlatList
          data={instrument}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idInstrumento.toString()}
          renderItem={({ item }) => (
            <Button
              mode="outlined"
              style={{ marginHorizontal: 4 , borderColor:"#000"}}
              labelStyle={{color:"#000"}}
              onPress={() => setFilterInstrument(item.idInstrumento)}
            >
              {item.nomeInstrumento}
            </Button>
          )}
        />
      </View>

      <View style={{ paddingHorizontal: 8, paddingBlock: 16}}>
        <Button
          labelStyle={{color:"#000"}}
          mode="outlined"
          icon="close"
          onPress={() => {
            setSearch("")
            setFilterCategory("")
            setFilterInstrument("")
            setCidade(null)
            setUf(null)
            setGenero(null)
            setInstrumentoFiltro(null)
            setValorMin(null)
            setValorMax(null)
            AsyncStorage.multiRemove([
              "cidade",
              "uf",
              "genero",
              "instrumento",
              "valorMin",
              "valorMax",
            ])
          }}
        >
          Limpar filtros
        </Button>
      </View>

      <FlatList
        data={FilterUsers}
        keyExtractor={(item) => item.idUsuario.toString()}
        renderItem={({ item }) => (
          <CardUsersList item={item} navigation={navigation} />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
