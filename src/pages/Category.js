import React,{useState,useEffect} from "react"
import { View, Text, TextInput} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { Button, IconButton } from "react-native-paper"
import styles from "../components/Style"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import axios from "axios"

import CardUsersList from "../components/CardUsersList"




export default function Category({navigation}){

    const [search,setSearch] = useState("")
    const [users,setUsers] = useState([])
    const [category,setCategory] = useState([])
    const isFocused = useIsFocused()

    const LoadingUsers = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/usuarios")
            setUsers(res.data)

        }catch(error){
            Alert.alert("ERROR",error)
        }
        
    }

    const LoadingCategory = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/categorias")
            setCategory(res.data)

        }catch(error){
            Alert.alert("ERROR",error)
        }
        
    }

    useEffect(() => {
        if(isFocused)
            LoadingUsers()
            LoadingCategory()
    },[isFocused])

    const FilterUsers = users.filter(user =>
        user.nome.toLowerCase().includes(search.toLowerCase())
    )

    return(
        <View style={{paddingTop:56}}>
            
            <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:12 }}>
                <TextInput  style={styles.input} placeholder="Buscar Free Lances" value={search} onChangeText={setSearch} /> 
                <IconButton  style={styles.filter} icon="text-search" size={30}  onPress={() => navigation.navigate("Filters")} />
            </View>

            

            <View style={styles.space} >
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
                />
        </View>
    )
}