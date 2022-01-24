import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";

const InterestModalItem = ({ style, data, onChange, array }) => {
  function getSelectedStyleWrapper() {
    return data.selected ? styles.selected : {};
  }

  function getSelectedStyleText() {
    return data.selected ? styles.selectedText : {};
  }

  function changeSelected() {
    const copy = JSON.parse(JSON.stringify(array));
    const index = copy.findIndex((item) => item.name == data.name);
    if (index != -1) copy[index].selected = !copy[index].selected;
    onChange(copy);
  }

  return (
    <Pressable
      onPress={() => changeSelected()}
      style={[styles.wrapper, getSelectedStyleWrapper(), style]}
    >
      <Text style={[styles.text, getSelectedStyleText()]}>{data.name}</Text>
    </Pressable>
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
  selected: {
    backgroundColor: colors.greenSecondary,
  },
  selectedText: {
    color: colors.blackPrimary,
  },
  text: {
    fontFamily: "RobotoMedium",
    color: colors.grey200,
  },
});

export default InterestModalItem;
