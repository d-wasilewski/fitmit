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
          <View>
            <Button
              title={"get started"}
              onPress={() => navigation.navigate("Register")}
            />
          </View>
          <View>
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
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
  },
  image: {
    flex: 1,
    // transform([{ rotateX: "45deg" }, { rotateZ: '0.785398rad' }]);
    // TODO: przeskalowac recznie image
  },
  child: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default Start;
