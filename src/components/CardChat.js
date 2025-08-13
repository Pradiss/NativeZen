
import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "./Style"
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function CardChat({ item, navigation }) {


    return (
        <TouchableOpacity  >

            <View style={{
                flexDirection: "row", alignItems: "center",
                backgroundColor: "#fff", borderRadius: 28, marginBlock: 8, padding: 6, marginHorizontal: 12,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 2 },
                shadowOpacity: 0.16,
                shadowRadius: 3,
                elevation: 5,
            }}>
                <Image
                    source={require("../asset/avatar.png")}
                    style={{ width: 100, height: 100, borderRadius: 22 }}
                    resizeMode="cover"

                />
                <View style={{ padding: 16, justifyContent: "center", flexDirection: "row", alignContent: "flex-end" }}>
                    <View>
                        <Text style={{ fontSize: 22, color: "#232323", fontWeight: 600 }}>{item.nome}</Text>
                        <Text style={styles.textEndress}><MaterialCommunityIcons name="google-maps" size={20} />{item.enviou_id}</Text>

                        <View style={{ flexDirection: "row" }}>

                            <Text style={styles.textEndress}>
                                <MaterialCommunityIcons name="guitar-acoustic" size={20} color="#000">
                                </MaterialCommunityIcons>{item.recebeu_id}
                            </Text>

                        </View>
                    </View>

                </View>

                <View style={{ flex: 1, alignItems: "flex-end", padding: 4, marginTop: 70 }}>
                    <MaterialCommunityIcons
                        style={{ backgroundColor: "#6BD2D7", borderRadius: 30, padding: 3 }}
                        name="arrow-top-right"
                        size={15} color="#000"
                    />
                </View>

            </View>
        </TouchableOpacity>
    )
}
