import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import colors from "../../../../styles/colors";
import terms from "../../../../styles/terms-of-service";

const ModalTermsOfService = (props) => {
  const { visible, title, onQuit } = props;
  const marginSize = Dimensions.get("screen").height * 0.08;
  const buttonTopMargin = marginSize * 0.3;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={[styles.content, { marginTop: marginSize }]}>
          <View style={styles.headerWrapper}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <ScrollView
              style={styles.textWrapper}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.mainText}>{terms}</Text>
            </ScrollView>
          </View>
          <View style={[styles.buttonsWrapper, { marginTop: buttonTopMargin }]}>
            <Pressable
              on
              onPress={onQuit}
              style={[
                styles.button,
                {
                  backgroundColor: colors.greenSecondary,
                  borderBottomColor: colors.greenTriary,
                },
              ]}
            >
              <Text style={styles.buttonText}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.blackPrimary,
    width: "88%",
    height: "80%",
    borderRadius: 20,
    overflow: "visible",
    alignItems: "center",
  },
  text: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.blackPrimary,
    textAlign: "center",
  },
  headerWrapper: {
    backgroundColor: colors.orange,
    paddingVertical: 17,
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentWrapper: {
    width: "90%",
    height: "75%",
    alignItems: "center",
    paddingTop: 20,
  },
  buttonsWrapper: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  textWrapper: {
    marginTop: 20,
    width: "100%",
  },
  mainText: {
    color: colors.white,
    fontSize: 15,
  },
});

export default ModalTermsOfService;
