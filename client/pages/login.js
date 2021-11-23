import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";

import LoginForm from "../components/LoginForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";
import TopBar from "../components/TopBar";

const Start = ({ navigation }) => {
  return (
    <View>
      <ImageBackground source={bgPhoto} resizeMode="cover" style={styles.image}>
        <View style={styles.child}>
          <LoginForm></LoginForm>
          <TopBar
            leftIcon={faArrowLeft}
            color={"#F0F0F0"}
            onPressLeft={() => navigation.navigate("Start")}
          />
          <Button
            secondary
            title={"login"}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
  },
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
