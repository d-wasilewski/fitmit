import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";

const HomeMenu = ({ navigation, color }) => {
  const { height } = useWindowDimensions();
  return (
    <View style={[styles.container, { height: height * 0.1 }]}>
      <TouchableOpacity>
        <FontAwesomeIcon
          icon={faMapMarked}
          style={[styles.icon, { color }]}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesomeIcon
          icon={faHome}
          style={[styles.icon, { color }]}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={[styles.icon, { color }]}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.blackSecondary,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.greenSecondary,
    marginHorizontal: 25,
  },
});
export default HomeMenu;
