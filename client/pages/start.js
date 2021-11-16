import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";

import Button from "../components/Button";

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgPhoto} resizeMode="cover" style={styles.image}>
        <View style={styles.child}>
          <Button
            title={"get started"}
            onPress={() => navigation.navigate("Register")}
          />
          <Button
            secondary
            title={"login"}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  container: {},
  image: {
    // flex: 1,
    // transform: "scale(1.2)",
    // TODO: przeskalowac recznie image
    height: "100vh",
    width: "100vw",
  },
  child: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default Start;
