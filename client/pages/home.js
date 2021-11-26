import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import TopBar from "../components/TopBar";
import HomeMenu from "../components/HomeMenu";
import Greeting from "../components/homepage/Greeting";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        leftIcon={faBars}
        rightIcon={faBell}
        color={colors.greenSecondary}
        onPressLeft={() => navigation.navigate("Home")}
      />
      <ScrollView style={styles.content}>
        {/* todo zmienic na dynamiczne */}
        <Greeting username="Miciu"></Greeting>
      </ScrollView>
      <HomeMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackPrimary,
  },
  content: {
    flex: 1,
  },
});

export default Home;
