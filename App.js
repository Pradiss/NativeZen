import React, { useEffect } from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import Profile from './src/pages/Profile';
import Category from './src/pages/Category';
import Home from './src/pages/Home';
import ProfileView from "./src/pages/ProfileView";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from "./src/pages/Login";
import Splash from "./src/pages/Splash";
import Register from "./src/pages/Register";
import Notification from "./src/pages/Notification";
import EditProfile from "./src/pages/EditProfile";
import Config from "./src/pages/Config";
import Chat from "./src/pages/Chat";
import Filters from "./src/pages/Filters";
import ChangePassword from "./src/pages/ChangePassword";
import ScreenInicial from "./src/pages/ScreenInicial";
import FormRegister from "./src/pages/FormRegister";
import EditDescription from "./src/components/EditDescription";
import { ScreenChat } from "./src/pages/ScreenChat";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


function MainTabs() {
 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Explore") iconName = "magnify";
          else if (route.name === "Profile") iconName = "account-circle-outline";
          else if (route.name === "Chat") iconName = "chat-outline";
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        // tabBarShowLabel:false,
        tabBarActiveTintColor: '#6BD2D7',
        tabBarInactiveTintColor:"#ccc",
        tabBarStyle: {
          margin:14,
          backgroundColor: '#232323',
          borderRadius:22,
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          height: 55,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, 
        },
      })}>

      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="Explore" component={Category} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <PaperProvider>
        <StatusBar
        backgroundColor="#000"  // cor de fundo da barra
        barStyle="light" // ícones brancos
        translucent={false}     // se quiser que fique por cima do conteúdo (true = sobreposto)
      />
        <NavigationContainer>
          <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="Change Password" component={ChangePassword}  />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Notification" component={Notification} options={{headerShown:true , title:"Notificações"}}  />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ProfileDetails"  component={ProfileView}  />
            <Stack.Screen name="Editar Perfil" component={EditProfile} options={{headerShown:true}} />
            <Stack.Screen name="Filters" component={Filters} options={{headerShown:true}} />
            <Stack.Screen name="Configuração" component={Config} options={{headerShown:true}} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EditDescription" component={EditDescription}/>
            <Stack.Screen name="ScreenInicial" component={ScreenInicial} />
            <Stack.Screen name="FormRegister" component={FormRegister} />
            <Stack.Screen name="ScreenChat" component={ScreenChat}  />
            
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
