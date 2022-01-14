import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { Children } from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../../../styles/colors";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const ModalDropdownMenu = (props) => {
  const {
    title,
    label = "🦍",
    value = null,
    style,
    onUpdate,
    children,
  } = props;
  const [dropdownValue, setDropdownValue] = useState(value);
  const [dropdownLabel, setDropdownLabel] = useState(label);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    onUpdate(dropdownValue);
  }, [dropdownValue]);

  const isDefault = dropdownLabel == label ? { color: colors.grey200 } : {};

  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.labelText}>{title}</Text>
      <View style={styles.selectWrapper}>
        <Pressable style={styles.dropdown} onPress={() => setActive(!isActive)}>
          <Text style={[styles.dropdownLabel, isDefault]}>{dropdownLabel}</Text>
          {isActive ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              color={colors.orange}
              size={18}
              style={styles.iconWrapper}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronRight}
              color={colors.orange}
              size={18}
            />
          )}
        </Pressable>
      </View>
      {isActive ? (
        <View style={styles.itemWrapper}>
          {/* <ModalDropdownItem
            label="🏀 Basketball"
            value="BASKETBALL"
            onPress={() => {
              setDropdownValue("BASKETBALL");
              setDropdownLabel("🏀 Basketball");
              setActive(false);
            }}
          /> */}
          {Children.map(children, (element) => {
            return React.cloneElement(element, {
              ...element.props,
              onPress: () => {
                setDropdownValue(element.props.value);
                setDropdownLabel(element.props.label);
                setActive(false);
              },
            });
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  selectWrapper: {
    backgroundColor: colors.blackPrimary,
  },
  labelText: {
    fontSize: 16,
    color: colors.orange,
    fontFamily: "RobotoBold",
    marginBottom: 5,
    marginLeft: 3,
  },
  dropdown: {
    borderColor: colors.orange,
    borderRadius: 10,
    borderWidth: 1,
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownLabel: {
    color: colors.white,
    fontSize: 18,
    fontFamily: "RobotoRegular",
  },
  itemWrapper: {
    padding: 12,
    borderColor: colors.grey300,
    borderWidth: 1,
    marginTop: -7,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
  },
});

export default ModalDropdownMenu;
