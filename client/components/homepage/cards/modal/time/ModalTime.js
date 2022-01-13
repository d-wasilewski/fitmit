import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import colors from "../../../../../styles/colors";

const ModalTime = (props) => {
  const { visible, onChangeHours, onChangeMinutes, style, close } = props;

  // ! temp
  const [hours, setHours] = useState(15);
  const [minutes, setMinutes] = useState(11);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={[styles.container, style]}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={hours}
            selectTextOnFocus
            onChangeText={onChangeHours}
            style={[styles.modalText, styles.input]}
            maxLength={2}
            keyboardType="numeric"
          />
          <Text
            style={[styles.modalText, { color: colors.grey200, padding: 5 }]}
          >
            :
          </Text>
          <TextInput
            value={minutes}
            selectTextOnFocus
            onChangeText={onChangeMinutes}
            style={[styles.modalText, styles.input]}
            maxLength={2}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable onPress={close}>
            <Text style={[styles.buttonText]}>Cancel</Text>
          </Pressable>
          <Pressable onPress={close}>
            <Text style={[styles.buttonText]}>Ok</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  inputWrapper: {
    backgroundColor: colors.blackSecondary,
    width: "80%",
    paddingVertical: 40,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    backgroundColor: colors.blackPrimary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalText: {
    color: colors.orange,
    fontFamily: "RobotoBold",
    fontSize: 28,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    marginTop: 15,
  },
  buttonText: {
    color: colors.grey200,
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
});

export default ModalTime;
