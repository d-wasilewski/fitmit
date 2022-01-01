import React from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import bgImg from "../assets/card-list-orange.png";
import TopBar from "../components/shared/TopBar";
import colors from "../styles/colors";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import HomeMenu from "../components/shared/HomeMenu";
import ImagePicker from "../components/ImagePicker";

const GroupProfile = (props) => {
  const height = Dimensions.get("window").height * 0.03;

  return (
    <View style={[styles.container]}>
      <ImageBackground source={bgImg} style={styles.headerImage}>
        {/* <Navbar title="Groups"></Navbar> */}
        <TopBar
          title="Group"
          color={colors.blackPrimary}
          leftIcon={faArrowLeft}
          position="relative"
          style={styles.topbar}
        />
        <ImagePicker
          style={{ marginTop: 0, borderWidth: 2, borderColor: colors.orange }}
        />
        <Text style={[styles.groupName, { marginTop: height }]}>
          Drążkowe Świry
        </Text>
      </ImageBackground>
      <HomeMenu color={colors.orange}></HomeMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPrimary,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    aspectRatio: 360 / 238,
    flexDirection: "column",
    alignItems: "center",
  },
  topbar: {
    marginBottom: 10,
    position: "relative",
  },
  groupName: {
    fontFamily: "ComfortaaBold",
    fontSize: 20,
    color: colors.orange,
    letterSpacing: 1.1,
  },
});

export default GroupProfile;
