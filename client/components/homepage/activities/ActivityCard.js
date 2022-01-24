import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../styles/colors";

const ActivityCard = (props) => {
  const {
    statistics = [
      { name: "Steps", value: 0, unit: "m" },
      { name: "Calories", value: 0, unit: "kcal" },
      { name: "Time In Action", value: "00:00", unit: "hr" },
    ],
    weekDay = "Today",
    date = "24.10.2021",
    gradientColor = "#002C3F",
    style,
  } = props;

  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth * 0.88,
          marginLeft: windowWidth * 0.03,
        },
        style,
      ]}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={[gradientColor, "#1c1c1c"]}
        style={styles.gradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.part}>
            <View>
              <Text style={styles.cardTitle}>Activity</Text>
              <Text style={styles.cardWeekDay}>{weekDay}</Text>
            </View>
            <Text style={styles.cardDate}>{date}</Text>
          </View>
          <View style={[styles.part, { alignItems: "flex-end" }]}>
            {statistics.map((activity, index) => {
              return (
                <View key={activity.name}>
                  <Text style={styles.dataName}>{activity.name}</Text>
                  <View style={styles.valueWrapper}>
                    <Text style={styles.dataValue}>{activity.value}</Text>
                    <Text style={[styles.dataName, { fontSize: 12 }]}>
                      {activity.unit}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
  },
  gradient: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  part: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 20,
  },
  cardTitle: {
    fontFamily: "ComfortaaBold",
    fontSize: 20,
    color: colors.white,
  },
  cardDate: {
    fontFamily: "ComfortaaSemiBold",
    fontSize: 12,
    color: colors.grey200,
  },
  cardWeekDay: {
    fontFamily: "ComfortaaSemiBold",
    fontSize: 15,
    color: colors.grey200,
  },
  dataName: {
    fontFamily: "ComfortaaMedium",
    color: colors.grey200,
  },
  dataValue: {
    fontFamily: "ComfortaaRegular",
    color: colors.white,
  },
  valueWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default ActivityCard;
