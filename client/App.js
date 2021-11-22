import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Start from "./pages/start";
import Login from "./pages/login";
import Register from "./pages/register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Start />
    //   {/* {/* <Login /> */}
    //   {/* <Register /> */}
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        // screenOptions={{
        //   headerShown: false,
        // }}
        // zakomentowane dla łatwiejszej nawigacji dopóki nie zrobimy swojego headera
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
