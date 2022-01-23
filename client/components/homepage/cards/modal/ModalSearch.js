import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../../styles/colors";

const ModalSearch = ({ onInputChange, inputValue }) => {
  return (
    <View style={styles.inputWrapper}>
      <FontAwesomeIcon icon={faSearch} color={colors.orange} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={colors.grey300}
        style={styles.input}
        value={inputValue}
        onChangeText={onInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: colors.blackPrimary,
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    marginLeft: 15,
    color: colors.white,
    width: "100%",
  },
});

export default ModalSearch;
