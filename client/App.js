import React, { useState, useEffect } from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import User from "./pages/userProfile";
import store from "./redux/store";
import { loginUser, logoutUser } from "./redux/actions/userActions";

const Stack = createNativeStackNavigator();

axios.defaults.baseURL = "http://192.168.1.11:5000/api/";

export default function App() {
  const [tok, setTok] = useState("");
  const [loading, setLoading] = useState(true);
  const [routeName, setRouteName] = useState("Login");

  useEffect(async () => {
    const tok = await AsyncStorage.getItem("authToken");

    if (tok) {
      const decodedToken = jwtDecode(tok);
      // console.log("Token : ", decodedToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        // console.log("wylogowywuje");
        setRouteName("Login");
      } else {
        axios.defaults.headers.common["Authorization"] = tok;
        // FIXME: zmienic loginUser na SET_AUTHENTICATED i GET_USER/{id_z_tokenu}
        store.dispatch(loginUser({ login: "User", password: "12345" }));
        setRouteName("Home");
        // console.log("loguje");
      }
    }
    setLoading(false);
  }, [tok, loading, routeName]);

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
      {!loading ? (
        <NavigationContainer>
          <StatusBar hidden={false} animated={true} translucent={false} />
          <Stack.Navigator
            // initialRouteName={routeName}
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Text>Loading...</Text>
      )}
    </Provider>
  );
}
