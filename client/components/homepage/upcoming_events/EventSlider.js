import React, { useState } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import EventAddCard from "./EventAddCard";
import EventCard from "./EventCard";
import ModalAddEvent from "../cards/modal/add-event/ModalAddEvent";

const EventSlider = (props) => {
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const styles = StyleSheet.create({
    element: {
      marginLeft: windowWidth * 0.03,
    },
    lastElement: {
      marginRight: windowWidth * 0.05,
    },
  });

  const { cards = [], style, altBg, expandable, addFunction } = props;

  if (expandable) cards.push({});

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      {cards.map((val, index) => {
        if (val.name == undefined) return null;
        return index != cards.length - 1 ? (
          <EventCard
            key={val._id}
            style={styles.element}
            altBg={altBg}
            data={val}
          />
        ) : (
          <EventCard
            key={val + index}
            style={[styles.element, styles.lastElement]}
            altBg={altBg}
            data={val}
          />
        );
      })}
      {expandable ? (
        <>
          <EventAddCard
            altBg={altBg}
            style={[styles.element, styles.lastElement]}
            onPress={() => setAddEventModalVisible(!isAddEventModalVisible)}
          />
          <ModalAddEvent
            visible={isAddEventModalVisible}
            title="Add Event"
            onQuit={() => setAddEventModalVisible(!isAddEventModalVisible)}
          ></ModalAddEvent>
        </>
      ) : null}
    </ScrollView>
  );
};

export default EventSlider;
