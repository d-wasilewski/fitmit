import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GenericCard from "./GenericCard";
import colors from "../../../styles/colors";

const GenericCardHolder = (props) => {
  const {
    title,
    cards = [],
    colors = ["rgba(255, 0, 0, 0.2)", "rgba(38, 38, 38, 0.1)"],
  } = props;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
      {cards.map((val) => {
        return <GenericCard key={val.data.title} data={val.data}></GenericCard>;
      })}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "7%",
    width: "100%",
    borderRadius: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  title: {
    fontFamily: "ComfortaaBold",
    fontSize: 20,
    color: colors.grey100,
    marginBottom: "7%",
  },
});

export default GenericCardHolder;
