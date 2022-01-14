import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../styles/colors";

import inputs from "../styles/inputs";

const Input = (props) => {
  return (
    <TextInput
      style={[style.input, inputs.underlined]}
      placeholder={props.placeholder}
      placeholderTextColor={
        props.placeholderTextColor ? props.placeholderTextColor : colors.white
      }
      onChangeText={props.onChange}
      name={props.name}
      secureTextEntry={props.secureTextEntry}
    ></TextInput>
  );
};

const style = StyleSheet.create({
  input: {},
});

export default Input;
