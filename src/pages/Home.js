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





export default function Home({navigation}){

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{paddingTop:50}}> 
        <View style={styles.container}>
            
            <AvatarProfile
<<<<<<< HEAD
            navigation={navigation}
=======
        
>>>>>>> 670c740b05e39159a7401b7478db1746fb620591
            />
            
            <View style={{flexDirection:"row", alignItems:"center" , marginHorizontal:12,}}>
                <TextInput  style={styles.input} placeholder="Search Free Lance" value={search} onChangeText={setSearch} /> 
                <IconButton  style={styles.filter} icon="text-search" size={30}  ></IconButton> 
            </View>
            

            <View style={styles.title} >
                <Text>Category</Text>
                <Text title="Press me"style={{width:"13%", fontSize:12}} onPress={() => navigation.navigate("Category")}>See all</Text>
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
               
               />
            )}
            />

            <View style={styles.title} >
                <Text>Melhores Musicos Free</Text>
                <Text title="Press me"style={{width:"13%", fontSize:12}} onPress={() => navigation.navigate("Category")}>See all</Text>
            </View>

            <FlatList
            style={{paddingStart:12}}
            data={users}
            keyExtractor={(item) => item.idUsuario.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
               <CardUsers
               item={item}
               navigation={navigation}
               
               
               />

            )}
            />           
        </View>
        </ScrollView>
    </TouchableWithoutFeedback>
    )
}