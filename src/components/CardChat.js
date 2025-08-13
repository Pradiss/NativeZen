import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./Style";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { apiUsers } from "../service.js/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardChat({ item, navigation }) {
  return (
     <TouchableOpacity onPress={() => navigation.navigate("ResultExtrato")}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBlock: 18,
          gap: 10,
        }}>

        <Avatar.Image
          size={50}
          source={require("../asset/avatar.png")}
          style={{ alignSelf: "flex-start", backgroundColor: "#232323" }}
        />

        <View style={{ flex: 1, gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>
            {item.enviou_id}
          </Text>
          <Text style={{ fontSize: 16, color: "#555" }}>
            {item.recebedor_name}
          </Text>
        </View>

        <View style={{flex:1, alignItems: "flex-end"  ,gap:8}}>
        
          <Text style={{ color: "#000", fontSize: 16 }}>{item.data_envio}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />

    
    </TouchableOpacity>
  );
}
