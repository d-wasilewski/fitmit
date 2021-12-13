import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import axios from "axios";

import Start from "./pages/start";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import User from "./pages/userProfile";
import store from "./redux/store";
import CardList from "./pages/cardList";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = "http://192.168.1.11:5000/api/";

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoBlackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoLightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoMediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
    RobotoThinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
    ComfortaaRegular: require("./assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaLight: require("./assets/fonts/Comfortaa-Light.ttf"),
    ComfortaaMedium: require("./assets/fonts/Comfortaa-Medium.ttf"),
    ComfortaaSemiBold: require("./assets/fonts/Comfortaa-SemiBold.ttf"),
    ComfortaaBold: require("./assets/fonts/Comfortaa-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={false} animated={true} translucent={false} />
        <Stack.Navigator
          initialRouteName="CardList"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="User" component={User} />
          {/* tymczasowo */}
          <Stack.Screen name="CardList" component={CardList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
