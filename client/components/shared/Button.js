import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props) => {
  const { title, onPress } = props;

  let text = props.secondary ? (
    <Text style={[styles.btn, styles.btn_secondary]}>{title}</Text>
  ) : (
    <Text style={[styles.btn, styles.btn_primary]}>{title}</Text>
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      {text}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn_primary: {
    color: "black",
    backgroundColor: "#6BF300",
    // to trzeba bedzie zmienic jak sie doda inputy
    // marginTop: "70%",
    // fontFamily: "Roboto", XD
    // TODO: znalezc nowego fonta
  },
  btn_secondary: {
    color: "#6BF300",
  },
  container: {
    justifyContent: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    paddingTop: "7%",
    height: "100%",
    width: "100%",
    textAlign: "center",
    margin: "auto",
    textTransform: "uppercase",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#6BF300",
    borderRadius: 999,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default Button;
