import React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";

import LoginForm from "../components/LoginForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";
import TopBar from "../components/TopBar";

const Start = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View>
      <ImageBackground
        source={bgPhoto}
        resizeMode="cover"
        style={[styles.image]}
      >
        <View style={[styles.child]}>
          <TopBar
            leftIcon={faArrowLeft}
            color={"#F0F0F0"}
            onPressLeft={() => navigation.navigate("Start")}
          />
          <View style={styles.form}>
            <LoginForm navigation={navigation} />
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
    marginBottom: "63%",
  },
});

export default Start;
