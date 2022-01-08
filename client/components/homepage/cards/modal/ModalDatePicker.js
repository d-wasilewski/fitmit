import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../../styles/colors";
import moment from "moment";

const ModalDatePicker = (props) => {
  const { title, value = moment().format("l"), style, onChange } = props;

  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.labelText}>{title}</Text>
      <Pressable style={[styles.dateWrapper]} onPress={() => setOpen(true)}>
        <Text style={styles.pickerText}>{value}</Text>
        <FontAwesomeIcon icon={faCalendarDay} color={colors.orange} />
      </Pressable>
      <DatePicker open={open} date={new Date()} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  labelText: {
    fontSize: 16,
    color: colors.orange,
    fontFamily: "RobotoBold",
    marginBottom: 5,
    marginLeft: 3,
  },
  dateWrapper: {
    borderColor: colors.orange,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    padding: 12,
    backgroundColor: colors.blackPrimary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "RobotoRegular",
  },
});

export default ModalDatePicker;
