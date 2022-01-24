import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import InterestItem from "./InterestItem";
import colors from "../../../styles/colors";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const InterestsList = ({ style, title, onPress, data }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <FontAwesomeIcon icon={faPen} style={styles.icon} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {/* <InterestItem name="jebanie disa 🍆" />
        <InterestItem name="mobilki 💻" />
        <InterestItem name="robienie fikołków 🦈" />
        <InterestItem name="💀" /> */}
        {data.map((interest) =>
          interest.selected ? (
            <InterestItem key={interest.name} name={interest.name} />
          ) : null
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: "7%",
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontFamily: "RobotoBold",
    color: colors.white,
  },
  container: {
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  icon: {
    color: colors.greenSecondary,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "4%",
  },
});

export default InterestsList;
