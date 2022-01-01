import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import EventCard from "./EventCard";

const EventSlider = (props) => {
  const windowWidth = Dimensions.get("window").width;

  const {
    cards = [
      { groupName: "Drążkowe Świry" },
      { groupName: "Drążkowe Świry" },
      { groupName: "Drążkowe Świry" },
      { groupName: "Drążkowe Świry" },
    ],
    style,
    altBg,
  } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      {cards.map((val, index) => {
        return index != cards.length - 1 ? (
          <EventCard style={{ marginLeft: windowWidth * 0.03 }} altBg={altBg} />
        ) : (
          <EventCard
            style={{
              marginLeft: windowWidth * 0.03,
              marginRight: windowWidth * 0.05,
            }}
            altBg={altBg}
          />
        );
      })}
    </ScrollView>
  );
};

export default EventSlider;
