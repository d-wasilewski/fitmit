import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import colors from "../styles/colors";
import bgImg from "../assets/user_profile_bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import ImagePicker from "../components/ImagePicker";
import HomeMenu from "../components/shared/HomeMenu";

const User = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { username, desc } = useSelector(
    (state) => state?.user?.user
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImg}
        resizeMode="cover"
        style={[styles.image, { height: height * 0.3 }]}
      >
        <ImagePicker />
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={styles.iconTop}
            size={25}
          />
        </TouchableOpacity>
      </ImageBackground>

      <Text style={styles.name}>{username}</Text>
      <View style={styles.aboutMe}>
        <Text style={styles.aboutMeText}>About me</Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faPen} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.desc}>{desc ? desc : "No personal info"}</Text>

      <HomeMenu />
    </View>
  );
};

// TODO: Zmienić czcionki
const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    left: "7%",
    top: 40,
  },
  iconTop: {
    color: colors.blackPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blackPrimary,
  },
  image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 180,
    height: 180,
    backgroundColor: "green",
    borderRadius: 9999,
  },
  name: {
    fontSize: 40,
    color: colors.white,
    textAlign: "center",
    marginTop: 40,
  },
  desc: {
    color: colors.white,
    marginHorizontal: "7%",
    marginTop: 10,
  },
  aboutMe: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  aboutMeText: {
    color: colors.white,
    marginLeft: "7%",
    marginRight: 10,
    fontSize: 20,
  },
  icon: {
    color: colors.greenSecondary,
    height: 20,
    width: 20,
  },
});

export default User;
