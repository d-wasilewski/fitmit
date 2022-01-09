import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../../styles/colors";
import moment from "moment";
import DatePicker from "react-native-neat-date-picker";

const ModalDatePicker = (props) => {
  const { title, value, style, onChange } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.labelText}>{title}</Text>
      <Pressable
        style={[styles.dateWrapper]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.pickerText}>{value}</Text>
        <FontAwesomeIcon
          icon={faCalendarDay}
          color={colors.orange}
          style={{ marginBottom: 2 }}
        />
      </Pressable>
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={() => setShowDatePicker(false)}
        onConfirm={(date) => {
          onChange(date);
          setShowDatePicker(false);
        }}
        minDate={minDate}
        colorOptions={{
          headerColor: colors.orange,
          headerTextColor: colors.blackPrimary,
          backgroundColor: colors.blackSecondary,
          dateTextColor: colors.grey100,
          selectedDateTextColor: colors.blackPrimary,
          selectedDateBackgroundColor: colors.orange,
          changeYearModalColor: colors.orange,
          confirmButtonColor: colors.orange,
          weekDaysColor: colors.orange,
        }}
      />
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
    flex: 1,
  },
  pickerText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "RobotoRegular",
  },
});

export default ModalDatePicker;
