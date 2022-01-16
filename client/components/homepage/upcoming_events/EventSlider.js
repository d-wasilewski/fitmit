import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import EventAddCard from "./EventAddCard";
import EventCard from "./EventCard";
import ModalAddEvent from "../cards/modal/add-event/ModalAddEvent";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const EventSlider = (props) => {
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);
  const [cars, setCars] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const isFocused = useIsFocused();
  const styles = StyleSheet.create({
    element: {
      marginLeft: windowWidth * 0.03,
    },
    lastElement: {
      marginRight: windowWidth * 0.05,
    },
  });
  const {
    cards = [],
    style,
    altBg,
    expandable,
    addFunction,
    navigation,
  } = props;

  const { eventList, currentEvents } = useSelector((state) => state.event);

  // useEffect(() => {
  //   if (isFocused) {
  //     setLoaded(true);
  //   }
  // }, [isFocused]);

  useEffect(() => {
    setCars(currentEvents.length > 0 ? currentEvents : eventList);
    if (eventList.length > 0) {
      setLoaded(true);
    }
  }, [eventList, currentEvents]);

  if (expandable) cards.push({});

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      {loaded
        ? cars.map((val, index) => {
            if (val.name == undefined) return null;
            return index != cards.length - 1 ? (
              <EventCard
                key={val + index}
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
          })
        : null}
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
            navigation={navigation}
          ></ModalAddEvent>
        </>
      ) : null}
    </ScrollView>
  );
};

export default EventSlider;
