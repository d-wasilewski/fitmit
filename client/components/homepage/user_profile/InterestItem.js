import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../../styles/colors";

const InterestItem = ({ name, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 10,
    backgroundColor: colors.blackSecondary,
    borderRadius: 25,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "RobotoMedium",
    color: colors.grey200,
    textAlign: "center",
  },
});

export default InterestItem;
