import moment from "moment";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import colors from "../../../../../styles/colors";
import ModalDatePicker from "../ModalDatePicker";
import ModalDropdownItem from "../ModalDropdownItem";
import ModalDropdownMenu from "../ModalDropdownMenu";
import ModalInput from "../ModalInput";
import ModalTimePicker from "../ModalTimePicker";

const ModalAddEvent = (props) => {
  const { visible, title, onQuit } = props;
  const dateNow = new Date();
  const marginSize = Dimensions.get("screen").height * 0.08;
  const buttonTopMargin = marginSize * 0.3;

  const [eventType, setEventType] = useState(null);
  const [eventDate, setEventDate] = useState(dateNow);
  const [hours, setHours] = useState(dateNow.getHours());
  const [minutes, setMinutes] = useState(dateNow.getMinutes());

  console.log(hours, ":", minutes);

  // console.log(eventDate.toLocaleDateString(), eventTime.toLocaleTimeString());
  // const actualDate = new Date(eventDate);
  // actualDate.setHours(eventTime.getHours(), eventTime.getMinutes(), 0);
  // console.log("Transformed date:", actualDate.toLocaleString());

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={[styles.content, { marginTop: marginSize }]}>
          <View style={styles.headerWrapper}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <ScrollView
              style={styles.cardsWrapper}
              showsVerticalScrollIndicator={false}
            >
              <ModalInput title="Event name" placeholder="name" />
              <ModalDropdownMenu
                title="Event type"
                style={styles.elementMargin}
                onUpdate={setEventType}
                label="😎 select sport"
              >
                <ModalDropdownItem label="🏀 Basketball" value="BASKETBALL" />
                <ModalDropdownItem label="🏐 Volleyball" value="VOLLEYBALL" />
                <ModalDropdownItem label="🏓 Pipong" value="PIPONG" />
                <ModalDropdownItem
                  label="⚽ JARANIE SIĘ PIŁKĄ NOŻNĄ TO"
                  value="FOOTBALL"
                />
                <ModalDropdownItem
                  label="🦍 Calisthenics"
                  value="CALISTHENICS"
                />
              </ModalDropdownMenu>
              <View style={[styles.pickerWrapper, styles.elementMargin]}>
                <ModalDatePicker
                  title="Date"
                  style={{ width: "50%" }}
                  onChange={setEventDate}
                  value={moment(eventDate).format("l")}
                />
                <ModalTimePicker
                  title="Time"
                  style={{ width: "45%" }}
                  onChange={(hours, minutes) => {
                    setHours(hours);
                    setMinutes(minutes);
                  }}
                  hours={hours}
                  minutes={minutes}
                />
              </View>
            </ScrollView>
          </View>
          <View style={[styles.buttonsWrapper, { marginTop: buttonTopMargin }]}>
            <Pressable
              onPress={onQuit}
              style={[
                styles.button,
                {
                  backgroundColor: colors.red,
                  borderBottomColor: colors.darkRed,
                },
              ]}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
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
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.blackSecondary,
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
  cardsWrapper: {
    marginTop: 20,
    width: "100%",
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
  elementMargin: {
    marginTop: 20,
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ModalAddEvent;
