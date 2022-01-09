import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import colors from "../../../../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const ModalTimePicker = (props) => {
  const { title, value, style, onChange } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.labelText}>{title}</Text>
      <Pressable
        style={[styles.dateWrapper]}
        onPress={() => setShowDatePicker(true)}
      >
        {/* <Text style={styles.pickerText}>{value}</Text> */}

        <DateTimePicker
          display="default"
          mode="time"
          testID="dateTimePicker"
          value={value}
          is24Hour={true}
          onChange={onChange}
          textColor="red"
          locale="en-gb"
          style={styles.picker}
        />
        <FontAwesomeIcon
          icon={faClock}
          color={colors.orange}
          style={{ marginBottom: 2 }}
        />
      </Pressable>
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
  picker: {
    flex: 1,
  },
});

export default ModalTimePicker;
