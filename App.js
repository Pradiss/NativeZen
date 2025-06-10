import React from "react";
import Profile from './src/pages/Profile';
import Category from './src/pages/Category';
import Home from './src/pages/Home';
import ProfileView from "./src/pages/ProfileView";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from "./src/pages/Login";
import Splash from "./src/pages/Splash";
import Register from "./src/pages/Register";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


function MainTabs({idUsuario}) {
 
  console.log("passou caraio", idUsuario)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Category") iconName = "account-search-outline";
          else if (route.name === "Profile") iconName = "account-circle-outline";
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="ProfileDetails" component={ProfileView} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
