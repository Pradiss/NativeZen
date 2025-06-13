
import React,{useState,useEffect} from "react"
import { View, Text, Image ,Alert } from "react-native"
import { useIsFocused , useRoute} from "@react-navigation/native"
import axios from "axios"
import styles from "../components/Style"


export default function ProfileView({navigation}){

    
    const [users,setUsers] = useState([])
    const [categoria,setCategory] = useState([])
    const isFocused = useIsFocused()
     const route = useRoute();
     const { idUsuario } = route.params; 
    
   
    const instrumento = (idInstrumento) =>{
        switch(idInstrumento){
            case 1: return "Violão";
            case 2: return "Bateria";
            case 3: return "Cavaco";
            case 4: return "Cantor(a)";
            case 5: return "Baixo";
        }
        
    }
    const category = (idCategoria) =>{
        switch(idCategoria){
            case 1: return "Samba";
            case 2: return "Sertanejo";
            case 3: return "Rock";
            case 4: return "Pagode";
            case 5: return "MPB";
            case 6: return "DJ";
        }
        
    }
    

  

    useEffect(() => {
        const authHeader = {
            headers: {
                Authorization: `Basic ${btoa('admin@example.com:password')}`,
                // Authorization: `Bearer ${token}`,
            },
        };
        const LoadingUsers = async () =>{
            try{
               
                const res = await axios.get(`https://erick5457.c44.integrator.host/api/usuarios/${idUsuario}`, authHeader)
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
            Alert.alert("ERROR",error.message)
        }
        
    }

        
        if(isFocused)
            LoadingUsers()
            LoadingCategory()
    },[isFocused])
    
    return(
        <View style={styles.SpaceTop}>
            <Image
                source={{uri: users.foto}}
                style={{ width: 150, height: 150, borderRadius: 100, alignSelf: 'center', marginTop: 20 }}
                />
                <View style={{alignItems:"center" }}>

                    <Text style={styles.title}>{users.nome}</Text>
                    <Text style={styles.title}>{category(users.idCategoria)} {instrumento(users.idInstrumento)}</Text>
                </View>
        </View>
    )
}
