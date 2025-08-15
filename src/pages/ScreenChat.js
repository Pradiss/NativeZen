import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  ScrollView
} from "react-native";
import styles from "../components/Style";
import InputMessage from "../components/InputMessage";
import { apiMessageReceive, apiMessageSender, apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { formatarDataOuHora } from "../utils/mask";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


export function ScreenChat({ route, navigation }) {
  const { idMensagens, enviou, recebeu } = route.params;

  const [iduser, setIdUser] = useState(null)
  const [messages, setMessages] = useState([]);
  const isFocused = useIsFocused()

  const loadMessages = async () => {
    try {
      
      const res = await apiMessageReceive.get(`/${idMensagens}`);
      setMessages(res.data);
    } catch (e) {
      Alert.alert("Erro ao carregar mensagens", e.message);
    }
  };



  useEffect(() => {
    if (isFocused) {
     
      loadMessages();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#6BD2D7" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <View style={{
            flexDirection:"row",
            gap:16,
            justifyContent:"center",
            alignItems:"center",
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderEndEndRadius: 16,
            borderBottomLeftRadius: 16,
            backgroundColor: "#fff",
          }}>
            <View>

            <MaterialCommunityIcons 
            name="arrow-left" 
            size={25} color="#000" onPress={()=> navigation.navigate("MainTabs",{screen: "Chat"})}/> 

            
            </View>

            <Avatar.Image
              size={40}
              source={ require("../asset/avatar.png")}
              style={{ alignSelf: "flex-start", backgroundColor: "#232323" }}
              imageStyle={{ resizeMode: "cover" }}
            />

            <View style={{ flex: 1, gap: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>
                {messages.nome}</Text>
              

            </View>
            
          </View>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.idMensagens.toString()}
            renderItem={({ item }) => (
              <ScrollView >
              <View style={{ marginVertical: 8, paddingHorizontal:16, backgroundColor:"#fff", borderRadius:16, padding:8, gap:4}}>

                <Text style={{fontSize:16,fontWeight:600}}>{item.recebeu_id}</Text>
                <Text>{item.texto}</Text>

                  <View style={{alignItems:"flex-end"}}>
                    <Text style={{ fontSize: 12}}>{formatarDataOuHora(item.data_envio)} </Text>
                  </View>
               
              </View>
              </ScrollView>
            )}

            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        </View>

        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 8,
            backgroundColor: "#fff",
          }}
        >
          <InputMessage />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}