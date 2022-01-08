import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import colors from "../../../../styles/colors";

const ModalInput = (props) => {
  const { title, placeholder, style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.labelText}>{title}</Text>
      <TextInput
        style={[styles.input, styles.inputText]}
        placeholder={placeholder}
        placeholderTextColor={colors.grey200}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    padding: 1,
  },
  labelText: {
    fontSize: 16,
    color: colors.orange,
    fontFamily: "RobotoBold",
    marginBottom: 5,
    marginLeft: 3,
  },
  input: {
    borderColor: colors.orange,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    padding: 12,
    backgroundColor: colors.blackPrimary,
  },
  inputText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "RobotoRegular",
  },
});

export default ModalInput;
