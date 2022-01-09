import React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";

import LoginForm from "../components/LoginForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/shared/Button";
import TopBar from "../components/shared/TopBar";

const Login = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View>
      <ImageBackground
        source={bgPhoto}
        resizeMode="cover"
        style={[styles.image, { width, height }]}
      >
        <View style={[styles.child, { width, height }]}>
          <TopBar color={"#F0F0F0"} />
          <View style={styles.form}>
            <LoginForm navigation={navigation} />
          </View>
          <View style={styles.getStarted}>
            <Text style={styles.text}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUp}>SIGN UP NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  image: {
    // flex: 1,
    // transform: "scale(1.2)",
    // TODO: przeskalowac recznie image
    height: "100%",
    width: "100%",
  },
  child: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    height: "100%",
    width: "70%",
    justifyContent: "flex-end",
    marginBottom: "20%",
  },
  getStarted: {
    marginBottom: "30%",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "#f0f0f0",
    fontSize: 15,
    marginLeft: "10%",
  },
  signUp: {
    color: "#6BF300",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});

export default Login;
