import React, { useState, useEffect } from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import moment from "moment";
import * as Notifications from "expo-notifications";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import User from "./pages/userProfile";
import store from "./redux/store";
import CameraLauncher from "./components/CameraLauncher";
import CardList from "./pages/cardList";
import GroupProfile from "./pages/groupProfile";
import Settings from "./pages/settings";

import { getUserData, logoutUser } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
import { getGroups } from "./redux/actions/groupActions";
import Map from "./pages/map";

const Stack = createNativeStackNavigator();


// axios.defaults.baseURL = "http://192.168.1.11:5000/api/";
axios.defaults.baseURL = "http://192.168.100.8:5000/api/";

moment().locale("en-gb");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true);
  const [routeName, setRouteName] = useState("Login");

  useEffect(async () => {
    const tok = await AsyncStorage.getItem("authToken");

    if (tok) {
      const decodedToken = jwtDecode(tok);

      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        setRouteName("Login");
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        store.dispatch(getUserData(decodedToken.user_id));
        store.dispatch(getGroups(decodedToken.user_id));

        setRouteName("Home");
      }
    }
    setLoading(false);
  }, [loading, routeName]);

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
            initialRouteName={routeName}
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="CameraLauncher" component={CameraLauncher} />
            <Stack.Screen name="CardList" component={CardList} />
            <Stack.Screen name="GroupProfile" component={GroupProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Map" component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Text>Loading...</Text>
      )}
    </Provider>
  );
}
