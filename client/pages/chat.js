import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../styles/colors";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  const [text, onChangeText] = useState(null);

  const handleSubmit = () => {
    console.log("XD");
  };
  return (
    <View style={styles.container}>
      <TopBar
        title="Drążkowe Świry"
        leftIcon={faArrowLeft}
        rightIcon={faCalendarAlt}
        style={styles.topbar}
      ></TopBar>
      <View styles={styles.chatWrapper}>
        <Text>Xd</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Type a message..."
          placeholderTextColor={colors.grey300}
        />
        <TouchableOpacity style={styles.iconWrapper} onPress={handleSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} style={styles.icon} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPrimary,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  input: {
    width: "90%",
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
  icon: {
    color: colors.greenSecondary,
  },
  iconWrapper: {
    position: "absolute",
    right: "10%",
    zIndex: 10,
  },
  chatWrapper: {
    backgroundColor: "red",
    height: "100",
  },

  topbar: {
    position: "relative",
  },
});
