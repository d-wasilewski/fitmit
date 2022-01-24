import { Modal, StyleSheet, View, Text, Pressable } from "react-native";
import React from "react";
import colors from "../../../../styles/colors";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AntDesign } from "@expo/vector-icons";
import InterestModalItem from "./InterestModalItem";
import axios from "axios";

const InterestModal = ({
  visible,
  style,
  title,
  closeModal,
  data,
  onChange,
  user,
}) => {
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
            <Pressable
              onPress={async () => {
                const arr = data
                  .filter((val) => val.selected)
                  .map((val) => val.name);
                await axios.put(`/${user}/interests`, { interests: arr });
                closeModal();
              }}
              style={styles.crossWrapper}
            >
              <AntDesign name="close" size={25} color={colors.greenSecondary} />
            </Pressable>
          </View>
          <View style={styles.itemsWrapper}>
            {data.map((interest) => (
              <InterestModalItem
                key={interest.name}
                data={interest}
                onChange={onChange}
                array={data}
              />
            ))}
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
    justifyContent: "flex-start",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

export default InterestModal;
