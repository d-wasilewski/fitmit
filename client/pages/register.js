import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";
import TopBar from "../components/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "../components/RegisterForm";

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bgPhoto} resizeMode="cover" style={styles.image}>
        <TopBar
          color={"#F0F0F0"}
          leftIcon={faArrowLeft}
          onPressLeft={() => navigation.navigate("Start")}
        />
        <RegisterForm />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  center: {
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default Register;
