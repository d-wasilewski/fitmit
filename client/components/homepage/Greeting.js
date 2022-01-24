import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { useSelector } from "react-redux";

const Greeting = (props) => {
  const { firstTime } = useSelector((state) => state.user);
  return (
    <View style={styles.decorativeElement}>
      <Text style={styles.topText}>Hi, {props.username}</Text>
      <Text style={styles.bottomText}>
        {firstTime ? "Welcome" : "Welcome back"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  decorativeElement: {
    backgroundColor: colors.greenSecondary,
    width: "100%",
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: "7%",
  },
  topText: {
    fontFamily: "ComfortaaRegular",
    fontSize: 18,
    color: colors.white,
    fontSize: 15,
  },
  bottomText: {
    color: colors.white,
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.white,
    marginBottom: "7%",
  },
});

export default Greeting;
