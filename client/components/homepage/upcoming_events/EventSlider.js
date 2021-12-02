import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import EventCard from "./EventCard";

const EventSlider = (props) => {
  const windowWidth = Dimensions.get("window").width;

  const { cards = [], style } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <EventCard style={{ marginLeft: windowWidth * 0.03 }}></EventCard>
      <EventCard style={{ marginLeft: windowWidth * 0.03 }}></EventCard>
      <EventCard
        style={{
          marginLeft: windowWidth * 0.03,
          marginRight: windowWidth * 0.05,
        }}
      ></EventCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default EventSlider;
