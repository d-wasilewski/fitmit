import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import colors from "../../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddGroupForm from "./AddGroupForm";
import Modal from "react-native-modal";

const GroupAddModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        isVisible={modalVisible}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard={true}
      >
        <View style={styles.center}>
          {/* dodac X */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add new group</Text>
            <AddGroupForm setModal={setModalVisible} />
          </View>
        </View>
      </Modal>

      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faPlus} style={styles.icon} size={44} />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.greenSecondary,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "35%",
    minHeight: 280,
  },

  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 28,
  },
  addButton: {
    position: "absolute",
    bottom: -25,
    right: 20,
    width: 65,
    height: 65,
    display: "flex",
    backgroundColor: colors.greenSecondary,
    borderRadius: 999,
  },
  icon: {
    color: colors.blackSecondary,
  },
  iconContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
  },
});

export default GroupAddModal;
