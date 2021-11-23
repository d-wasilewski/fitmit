import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Logo from "../assets/logo.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const TopBar = (props) => {
  const { leftIcon, rightIcon, color } = props;

  const leftStyleIcon = leftIcon === undefined ? styles.invisible : undefined;
  const rightStyleIcon = rightIcon === undefined ? styles.invisible : undefined;

  return (
    //   TODO: jak sie usunie 1 z ikon to poprawic styl 🦍🦍🦍
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={leftIcon ? leftIcon : faArrowLeft}
        style={[styles.icon, { color }, leftStyleIcon]}
      />
      <Image source={Logo} style={styles.image} />
      <FontAwesomeIcon
        icon={rightIcon ? rightIcon : faArrowLeft}
        style={[styles.icon, { color }, rightStyleIcon]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "8vh",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginHorizontal: 25,
    marginTop: 15,
  },
  invisible: {
    opacity: 0,
  },
  image: {
    width: "200px",
    height: 30,
    marginTop: 15,
  },
});
export default TopBar;
