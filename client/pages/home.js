import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import colors from "../styles/colors";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import TopBar from "../components/TopBar";
import HomeMenu from "../components/HomeMenu";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        leftIcon={faBars}
        rightIcon={faBell}
        color={colors.greenSecondary}
        onPressLeft={() => navigation.navigate("Home")}
      />
      <HomeMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackPrimary,
  },
});

export default Home;
