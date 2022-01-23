import React from "react";
import GenericCardHolder from "./GenericCardHolder";
import { Pressable, StyleSheet, View } from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import colors from "../../../styles/colors";
import MemberAddModal from "./MemberAddModal";

const MemberCardHolder = (props) => {
  const { setModalVisible, isModalVisible, navigation, cards } = props;

  return (
    <View style={{ width: "100%", alignItems: "flex-end" }}>
      <GenericCardHolder
        style={{ marginBottom: -30 }}
        title="Members"
        colors={["rgba(255, 153, 0, 0.2) ", "rgba(38, 38, 38, 0.1)"]}
        cards={cards}
        navigation={navigation}
      ></GenericCardHolder>
      <Pressable style={styles.addButton} onPress={setModalVisible}>
        <FontAwesomeIcon icon={faPlus} style={styles.icon} size={44} />
      </Pressable>
      <MemberAddModal
        onQuit={setModalVisible}
        title="Members"
        visible={isModalVisible}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    padding: 11,
    backgroundColor: colors.orange,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: {
    color: colors.blackSecondary,
  },
});

export default MemberCardHolder;
