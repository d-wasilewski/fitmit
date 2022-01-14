import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import colors from "../../styles/colors";

const ModalInput = (props) => {
  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        name={props.name}
        style={styles.input}
        placeholderTextColor={colors.grey300}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: colors.blackSecondary,
    color: "white",
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 16,
    position: "relative",
    fontSize: 16,
  },
});

export default ModalInput;
