import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";

const HomeMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faSearchLocation} style={[styles.icon]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faHome} style={[styles.icon]} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon icon={faUserCircle} style={[styles.icon]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "10vh",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.blackSecondary,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    color: colors.greenSecondary,
    marginHorizontal: 25,
  },
});
export default HomeMenu;
