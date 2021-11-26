import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../styles/colors";

const ActivityCard = (props) => {
  const statistics = [
    { name: "Steps", value: 4560 },
    { name: "Calories", value: 2480 },
    { name: "Time In Action", value: 80 },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#002C3F", "#1c1c1c"]}
        style={styles.gradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.part}>
            <View>
              <Text style={styles.cardTitle}>Activity</Text>
              <Text style={styles.cardWeekDay}>Today</Text>
            </View>
            <Text style={styles.cardDate}>24.10.2021</Text>
          </View>
          <View style={[styles.part, { alignItems: "flex-end" }]}>
            {statistics.map((activity, index) => {
              return (
                <View>
                  <Text style={styles.dataName}>{activity.name}</Text>
                  <Text style={styles.dataValue}>{activity.value}</Text>
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
    width: "90%",
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
    paddingHorizontal: "5%",
    paddingVertical: "10%",
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
});

export default ActivityCard;
