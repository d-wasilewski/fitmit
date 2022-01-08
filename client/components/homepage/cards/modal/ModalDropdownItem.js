import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../../../styles/colors";

const ModalDropdownItem = (props) => {
  const { label, value, onPress, style } = props;

  return (
    <Pressable style={[styles.item, style]} onPress={onPress}>
      <Text style={styles.itemText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemText: {
    color: colors.grey200,
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
  item: {
    backgroundColor: colors.blackPrimary,
    padding: 12,
    marginTop: 12,
    borderRadius: 10,
  },
});

export default ModalDropdownItem;
