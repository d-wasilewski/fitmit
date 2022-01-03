import React, { Children, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GenericCard from "./GenericCard";
import colors from "../../../styles/colors";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GroupAddModal from "./GroupAddModal";

const GenericCardHolder = (props) => {
  const {
    title,
    cards,
    colors = ["rgba(255, 0, 0, 0.2)", "rgba(38, 38, 38, 0.1)"],
    style,
  } = props;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <Text style={styles.title}>{title}</Text>
      {cards.map((val, index) => {
        return (
          <GenericCard
            key={val.data.name + index}
            data={val.data}
          ></GenericCard>
        );
      })}
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "7%",
    paddingBottom: "10%",
    width: "100%",
    borderRadius: 30,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 50,
    marginHorizontal: "auto",
    position: "relative",
  },
  title: {
    fontFamily: "ComfortaaBold",
    fontSize: 20,
    color: colors.grey100,
    marginBottom: "7%",
  },
  addButton: {
    position: "absolute",
    bottom: -25,
    right: 20,
    width: 65,
    height: 65,
    display: "flex",
    backgroundColor: colors.greenSecondary,
    borderRadius: 999,
  },
  icon: {
    color: colors.blackSecondary,
  },
  iconContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
  },
});

export default GenericCardHolder;
