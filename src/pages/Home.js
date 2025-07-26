
import React,{useState,useEffect} from "react"
import { View, Text, TextInput,Button ,Alert, TouchableWithoutFeedback, Keyboard} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import { IconButton } from "react-native-paper"
import styles from "../components/Style"
import { FlatList, ScrollView } from "react-native-gesture-handler"
import CardCategory from "../components/CardCategory"
import CardUsers from "../components/CardUsers"
import axios from "axios"
import AvatarProfile from "../components/AvatarProfile"
import { useRoute } from "@react-navigation/native";
import CardInstrument from "../components/CardInstrumento"



export default function Home({navigation}){

    const [search,setSearch] = useState("")
    const [users,setUsers] = useState([])
    const [category,setCategory] = useState([])
    const [instrument,setInstrument] = useState([])
    const isFocused = useIsFocused()
    const route = useRoute();
    const { idUsuario } = route.params ?? {};
   

    useEffect(() => {
        
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
    const LoadingInstrument = async () =>{
        try{
            const res = await axios.get("https://erick5457.c44.integrator.host/api/instrumento")
            setInstrument(res.data)
        }catch(error){
            Alert.alert("ERROR",error)
        }   
    }
        if(isFocused)
            LoadingUsers()
            LoadingCategory()
            LoadingInstrument()
    },[isFocused])

  
  
    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View>
            <View style={styles.header}>
                <AvatarProfile 
                navigation={navigation}
                />
            </View>

            <ScrollView> 
            <View style={styles.container}>
                
                <View style={{flexDirection:"row", alignItems:"center" , marginHorizontal:12,paddingTop:18,}}>
                    <TextInput  style={styles.input} placeholder="Search Free Lance" value={search} onChangeText={setSearch} /> 
                    <IconButton  style={styles.filter} icon="text-search" size={30} onPress={() => navigation.navigate("Filtro", {item: search})}></IconButton> 
                </View>
                
                <View style={styles.title}>
                    <Text style={styles.titleName}>Categorias</Text>
                    <Text 
                    title="Press me"
                    style={{ fontSize:14}} 
                    onPress={() => navigation.navigate("Explore")}>
                        Ver todos</Text>
                </View>

                <FlatList
                style={{paddingStart:12}}
                data={category}
                keyExtractor={(item) => item.idCategoria.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                <CardCategory
                item={item}
                navigation={navigation}
                />
                )}
                />

                <View style={styles.title}>
                    <Text style={styles.titleName}>Melhores Musicos Free</Text>
                    <Text title="Press me" style={{fontSize:14}} onPress={() => navigation.navigate("Explore")}>Ver todos</Text>
                </View>

                <FlatList
                style={{paddingStart:12}}                  
                data={users}
                keyExtractor={(item) => item.idUsuario.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                <CardUsers
                item={item}
                navigation={navigation}
                />
                )}
                />     

                <View style={styles.title} >
                    <Text style={styles.titleName}>Escolha por instrumento</Text>
                    <Text title="Press me" style={{fontSize:14}} onPress={() => navigation.navigate("Explore")}>Ver todos</Text>
                </View>   

                <FlatList
                style={{paddingStart:12}}
                data={instrument}
                keyExtractor={(item) => item.idInstrumento.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                <CardInstrument
                item={item}
                navigation={navigation}
                />
                )}
                />   

                <View style={{paddingTop:300}}></View>

            </View>

            </ScrollView>
       </View>
    </TouchableWithoutFeedback>
    )
}
