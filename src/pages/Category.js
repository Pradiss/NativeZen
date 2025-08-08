import React,{useState,useEffect} from "react"
import { View, Text, TextInput,Alert} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Button, IconButton } from "react-native-paper"
import styles from "../components/Style"
import { FlatList } from "react-native-gesture-handler"
import CardUsersList from "../components/CardUsersList"
import { apiCategorias, apiInstrumento, apiUsers } from "../service.js/Api"
import { useRoute } from '@react-navigation/native'

export default function Category({navigation}){

    const [search,setSearch] = useState("")
    const [users,setUsers] = useState([])
    const [category,setCategory] = useState([])
    const [instrument, setInstrument] = useState([])
    const [filterCategory, setFilterCategory] = useState("")
    const [filterInstrument, setFilterInstrument] = useState("")
    const isFocused = useIsFocused()
    const route = useRoute();
    const { filtroCategoria: filtroCategoriaRota } = route.params || {}
    const { filtroInstrumento: filtroInstrumentoRota } = route.params || {}

    const LoadingAllData = async () => {
            try {
                const [resUsers, resCategorias, resInstrumentos] = await Promise.all([
                apiUsers.get("/"),
                apiCategorias.get("/"),
                apiInstrumento.get("/")
                ])

                setUsers(resUsers.data)
                setCategory(resCategorias.data)
                setInstrument(resInstrumentos.data)

            } catch (error) {
                Alert.alert("Erro ao carregar dados", error.message || "Erro desconhecido");
                console.log(error)
            }
        }

    useEffect(() => {
        if (isFocused && users.length === 0) {
        LoadingAllData()
    }
    },[isFocused])   
    

    
    useEffect(() => {
        if (filtroCategoriaRota) {
            setFilterCategory(filtroCategoriaRota);
        }

        if (filtroInstrumentoRota) {
            setFilterInstrument(filtroInstrumentoRota);
        }
    }, [filtroCategoriaRota, filtroInstrumentoRota]);

        const FilterUsers = users.filter(user => {
            //filtra por tudo 
            const filterAll =
             user.nome.toLowerCase().includes(search.toLowerCase()) ||
             user.cidade.toLowerCase().includes(search.toLowerCase());

            //filtra pela categoria 
            const filterCategoria = filterCategory ? user.idCategoria === filterCategory : true
            const filterInstrumento = filterInstrument ? user.idInstrumento === filterInstrument : true

        return filterAll && filterCategoria && filterInstrumento ;
        });

    return(
        <View style={{paddingTop:56, flex: 1,}}>
            
            <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:12 }}>
                <TextInput  style={styles.input} placeholder="Buscar Free Lances" value={search} onChangeText={setSearch} /> 
                <IconButton  style={styles.filter} icon="text-search" size={30}  onPress={() => navigation.navigate("Filters")} />
            </View>

            <View style={{paddingStart:8}}> 
                <FlatList 
                data={category}
                keyExtractor ={(item)=> item.idCategoria.toString()}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => {
                    return (
                    <Button
                        mode="contained"
                        style={{ marginVertical: 8,
                             marginHorizontal: 4,
                             backgroundColor:"#232323" }}
                        onPress={() => {setFilterCategory(item.item.idCategoria)}}
                        >
                        {item.item.generoMusical}
                    </Button>
                )
                }}
                />  
                
                <FlatList 
                data={instrument}
                keyExtractor ={(item)=> item.idInstrumento.toString()}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={(item) => {
                    return (
                    <Button
                        mode="outlined"
                        style={{marginVertical: 4,
                            marginHorizontal: 4,
                            }}
                        labelStyle={{ color: "#000" }}
                        onPress={() => {setFilterInstrument(item.item.idInstrumento)}}
                        >
                        {item.item.nomeInstrumento}
                    </Button>
                )
                }}
                />   
            </View>

            <View style={{paddingHorizontal:8,paddingTop:8}}>
                <Button
                    mode="outlined"
                    style={{ marginVertical: 8,
                        marginHorizontal: 4,
                        paddingBlock:2,
                        borderColor: "#232323",
                     }}
                    labelStyle={{ color: "#232323" }}
                    icon="close"
                    onPress={() => {
                        setSearch("")
                        setFilterCategory("")
                        setFilterInstrument("")
                        }}>
                    Limpar Filtros
                </Button>
            </View>

            <View style={styles.title} >
                <Text style={styles.titleName} > Todos os Free lances </Text>
            </View>
      
                <FlatList
                    data={FilterUsers}
                    keyExtractor={(item) => item.idUsuario.toString()}
                    renderItem={({ item }) => (
                        <CardUsersList
                        item={item}
                        navigation={navigation}
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListFooterComponent={<View style={{ height: 80 }} />}
                    />
            
                
        </View>
    )
}