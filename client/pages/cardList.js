import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import colors from "../styles/colors";
import bgImg from "../assets/card-list-orange.png";

const CardList = ({ navigation }) => {
  const screenHeight = Dimensions.height;

  return (
    <View style={[styles.container, { height: screenHeight * 0.3 }]}>
      <ImageBackground
        source={bgImg}
        style={styles.headerImage}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPrimary,
    height: "100%",
  },
  headerImage: {
    width: "100%",
  },
});

export default CardList;
