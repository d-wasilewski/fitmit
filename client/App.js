import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Start from "./pages/start";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {
  return (
    <View style={styles.container}>
      <Start />
      {/* {/* <Login /> */}
      {/* <Register /> */}
    </View>
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
