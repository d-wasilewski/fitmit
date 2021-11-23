import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = (props) => {
  const { title, onPress } = props;
  const [variant] = useState(props.primary);

  let text;
  props.secondary
    ? (text = <Text style={[styles.btn_secondary, styles.btn]}>{title}</Text>)
    : (text = <Text style={[styles.btn_primary, styles.btn]}>{title}</Text>);

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
    marginTop: "70vh",
    // fontFamily: "Roboto", XD
    // TODO: znalezc nowego fonta
  },
  btn_secondary: {
    color: "#6BF300",
    marginTop: 40,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    width: "50vw",
    height: "auto",
    textAlign: "center",
    margin: "auto",
    textTransform: "uppercase",
    border: "2px solid #6BF300",
    borderRadius: 999,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default Button;
