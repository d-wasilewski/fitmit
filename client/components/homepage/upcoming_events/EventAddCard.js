import React from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import colors from "../../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarPlus as plusIcon } from "@fortawesome/free-solid-svg-icons";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const EventAddCard = (props) => {
  const { style, altBg, onPress } = props;

  const iconColor = altBg ? "#A96500" : colors.greenSecondary;
  const gradientColors = altBg
    ? ["#FF9900", "#503000"]
    : ["#00B26A", "#002818"];

  const windowWidth = Dimensions.get("screen").width;

  return (
    <Pressable
      style={[styles.container, { width: windowWidth * 0.88 }, style]}
      onPress={onPress}
    >
      {/* <Pressable> */}
      {/* Obrazek */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.blackSecondary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesomeIcon icon={plusIcon} size={60} color={iconColor} />
      </View>
      {/* Panel na dole */}

      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0.9, y: 0.1 }}
      >
        <View style={styles.bottomWrapper}>
          <Text style={styles.font}>Add event</Text>
        </View>
      </LinearGradient>
      {/* </Pressable> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
    // border radius fix
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: 60,
    overflow: "visible",
  },
  font: {
    fontFamily: "ComfortaaRegular",
    color: colors.white,
    fontSize: 20,
  },
  bottomWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "6.25%",
  },
  altBgColor: { backgroundColor: colors.orange },
});

export default EventAddCard;
