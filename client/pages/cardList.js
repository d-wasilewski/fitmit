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
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CardList = ({ navigation }) => {
  const screenHeight = Dimensions.height;

  return (
    <View style={[styles.container]}>
      <ImageBackground source={bgImg} style={styles.headerImage}>
        {/* <Navbar title="Groups"></Navbar> */}
        <TopBar
          title="Groups"
          color={colors.blackPrimary}
          leftIcon={faArrowLeft}
        ></TopBar>
      </ImageBackground>
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
    aspectRatio: 360 / 238,
  },
});

export default CardList;
