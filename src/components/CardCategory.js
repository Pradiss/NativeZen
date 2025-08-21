
import React, { useState, useEffect } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

export default function CardCategory({ item, navigation }) {

    return (
        <TouchableOpacity onPress={() =>
            navigation.navigate("MainTabs", {
                screen: "Explore",
                params: {
                    filtroCategoria: item.idCategoria,
                },
            })
        }>
            <View  >
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Image

                        source={{ uri: item.foto }}
                        style={{ width: 80, height: 80, borderRadius: 28, marginEnd: 8, marginBottom: 8,borderWidth:1,borderColor:"#000" }}
                        resizeMode="cover"
                    />

                    <Text>{item.generoMusical}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
