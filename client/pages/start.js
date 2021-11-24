import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import bgPhoto from "../assets/startScreenBackground.jpg";
import Button from "../components/Button";
import TopBar from "../components/TopBar";

const Start = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgPhoto}
        resizeMode="cover"
        style={[styles.image]}
      >
        <View style={[styles.child, { width, height }]}>
          <TopBar color={"#F0F0F0"} />
          <View style={[styles.primmary_button]}>
            <Button
              title={"get started"}
              onPress={() => navigation.navigate("Register")}
            />
          </View>
          <View style={styles.secondary_button}>
            <Button
              secondary
              title={"login"}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // transform([{ rotateX: "45deg" }, { rotateZ: '0.785398rad' }]);
    // TODO: przeskalowac recznie image
  },
  child: {
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  primmary_button: {
    height: "6%",
    width: "70%",
    marginBottom: "15%"
  },
  secondary_button: {
    height: "6%",
    width: "70%",
    marginBottom: "35%"
  }
});

export default Start;
