import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../../../styles/colors";
import avatar from "../../../assets/papaj.jpg";

const GenericCard = (props) => {
  const {
    style,
    data = { title: "Dronszki s pyponszem", text: "Damian: JD" },
  } = props;

  return (
    <View style={[styles.container, style]}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.text}>{data.text}</Text>
      </View>
      <View style={styles.img}>
        <Image
          source={avatar}
          style={{ height: "100%", aspectRatio: 1, borderRadius: 10 }}
          resizeMode="cover"
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 72,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    borderRadius: 10,
  },
  title: { fontFamily: "RobotoRegular", color: colors.grey100, fontSize: 17 },
  text: { fontFamily: "RobotoLight", color: colors.grey200, fontSize: 14 },
});

export default GenericCard;
