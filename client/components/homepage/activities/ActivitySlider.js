import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import ActivityCard from "./ActivityCard";

const ActivitySlider = (props) => {
  const windowWidth = Dimensions.get("window").width;

  // Tutaj dane do cardow
  const {
    cards = [
      {
        statistics: [
          { name: "Steps", value: 4560 },
          { name: "Calories", value: 2480 },
          { name: "Time In Action", value: 80 },
        ],
        weekDay: "Today",
        date: "24.10.2021",
      },
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  } = props;
  const colors = [
    "#002C3F",
    "#3F3100",
    "#3F0B00",
    "#01003F",
    "#2B3F00",
    "#2E003F",
    "#003F37",
  ];

  return (
    <ScrollView horizontal style={[styles.container]}>
      {cards.map((card, index) => {
        return index != cards.length - 1 ? (
          <ActivityCard
            gradientColor={colors[index]}
            {...cards[index]}
          ></ActivityCard>
        ) : (
          <ActivityCard
            style={{ marginRight: windowWidth * 0.05 }}
            gradientColor={colors[index]}
            {...cards[index]}
          ></ActivityCard>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: "-7%",
  },
});

export default ActivitySlider;
