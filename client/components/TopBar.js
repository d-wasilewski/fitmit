import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Logo from "../assets/logo.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const TopBar = (props) => {
  const { leftIcon, rightIcon, color, onPressLeft, onPressRight } = props;
  const { height } = useWindowDimensions();

  const leftStyleIcon = leftIcon === undefined ? styles.invisible : undefined;
  const rightStyleIcon = rightIcon === undefined ? styles.invisible : undefined;

  return (
    <View style={[styles.container, { height: height * 0.08 }]}>
      <TouchableOpacity onPress={onPressLeft}>
        <FontAwesomeIcon
          icon={leftIcon ? leftIcon : faArrowLeft}
          style={[styles.icon, { color }, leftStyleIcon]}
        />
      </TouchableOpacity>
      <Image source={Logo} style={styles.image} />
      <TouchableOpacity onPress={onPressRight}>
        <FontAwesomeIcon
          icon={rightIcon ? rightIcon : faArrowLeft}
          style={[styles.icon, { color }, rightStyleIcon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
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
    width: "70%",
    height: 42,
    marginTop: 60,
  },
});
export default TopBar;
