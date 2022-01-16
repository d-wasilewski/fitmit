import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Logo from "../../assets/logo.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";

const TopBar = (props) => {
  const {
    leftIcon,
    rightIcon,
    color = colors.greenSecondary,
    onPressLeft,
    onPressRight,
    title,
    style,
  } = props;
  const { height } = useWindowDimensions();

  const leftStyleIcon = leftIcon === undefined ? styles.invisible : undefined;
  const rightStyleIcon = rightIcon === undefined ? styles.invisible : undefined;

  let gap;
  gap = title ? 10 : 0;

  return (
    <View style={[styles.container, { height: height * 0.05 }, style]}>
      <TouchableOpacity onPress={onPressLeft}>
        <FontAwesomeIcon
          icon={leftIcon ? leftIcon : faArrowLeft}
          style={[styles.icon, { color }, { marginTop: gap }, leftStyleIcon]}
          size={25}
        />
      </TouchableOpacity>
      {title ? (
        <Text style={[styles.title, { color }, { marginTop: gap }]}>
          {title}
        </Text>
      ) : (
        <Image source={Logo} style={[styles.image, { marginTop: gap }]} />
      )}
      <TouchableOpacity onPress={onPressRight}>
        <FontAwesomeIcon
          icon={rightIcon ? rightIcon : faArrowLeft}
          style={[styles.icon, { color }, { marginTop: gap }, rightStyleIcon]}
          size={25}
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
    elevation: 10,
    zIndex: 10,
    backgroundColor: "transparent",
    minHeight: 80,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginHorizontal: 25,
    marginTop: 30,
  },
  invisible: {
    opacity: 0,
  },
  image: {
    width: 240,
    height: 35,
    marginTop: 30,
  },
  title: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    marginTop: 30,
  },
});
export default TopBar;
