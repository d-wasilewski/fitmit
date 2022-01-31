import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../../styles/colors";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../../../redux/actions/userActions";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const DescriptionModal = ({
  visible,
  style,
  title,
  closeModal,
  data,
  onChange,
  user,
}) => {
  const [text, setText] = useState(data);
  const dispatch = useDispatch();

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <View style={[styles.wrapper, style]}>
          <View style={styles.header}>
            <FontAwesomeIcon
              icon={faTimes}
              size={25}
              color={colors.greenSecondary}
              style={{ opacity: 0 }}
            />
            <Text style={styles.headerText}>{title}</Text>
            <Pressable onPress={closeModal} style={styles.crossWrapper}>
              <AntDesign name="close" size={25} color={colors.greenSecondary} />
            </Pressable>
          </View>
          <View style={styles.itemsWrapper}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={(v) => setText(v)}
              multiline={true}
              placeholder="Description"
              placeholderTextColor={colors.grey200}
              spellCheck={false}
            />
            <Pressable
              onPress={async () => {
                dispatch(updateUserData(user, { desc: text }));
                closeModal();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.greenSecondary,
                  borderBottomColor: colors.greenTriary,
                },
              ]}
            >
              <Text style={styles.buttonText}>ACCEPT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  wrapper: {
    backgroundColor: colors.blackPrimary,
    width: "85%",
    height: "85%",
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.greenSecondary,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.greenSecondary,
  },
  crossWrapper: {
    height: "100%",
  },
  itemsWrapper: {
    padding: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  input: {
    color: colors.grey100,
    width: "100%",
    textAlignVertical: "top",
    height: SCREEN_HEIGHT * 0.6,
    fontFamily: "RobotoMedium",
    fontSize: 15,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: "blue",
    borderRadius: 5,
    borderBottomWidth: 3,
  },
  buttonText: {
    fontFamily: "RobotoBold",
    fontSize: 18,
    color: colors.white,
  },
});

export default DescriptionModal;
