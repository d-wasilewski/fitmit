import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import RegisterForm from "../components/RegisterForm";

const Register = ({ navigation }) => {
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgPhoto}
        resizeMode="cover"
        style={[styles.image, { width, height }]}
      >
        <View style={[styles.child, { width, height }]}>
          <TopBar
            color={"#F0F0F0"}
            leftIcon={faArrowLeft}
            onPressLeft={() => navigation.navigate("Login")}
          />
          <View style={styles.form}>
            <RegisterForm navigation={navigation} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  center: {
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  child: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    height: "100%",
    width: "70%",
    justifyContent: "flex-end",
    marginBottom: "45%", // podnosi do gory caly form (przycisk + input)
  },
});

export default Register;
