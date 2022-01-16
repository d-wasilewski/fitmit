import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import EventSlider from "./upcoming_events/EventSlider";
import bgImg from "../../assets/greenwavy.png";
import bgImgOrange from "../../assets/orangewavy.png";
import colors from "../../styles/colors";
import ModalAddEvent from "./cards/modal/add-event/ModalAddEvent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarPlus as plusIcon } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const EventSection = (props) => {
  const [isAddEventModalVisible, setAddEventModalVisible] = useState(false);
  const { currentEvents } = useSelector((state) => state.event);
  const backgroundImage = props.altBg ? bgImgOrange : bgImg;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: "100%", minHeight: 180 }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Upcoming Events</Text>
          {props.expandable && currentEvents.length > 0 ? (
            <Pressable
              onPress={() => setAddEventModalVisible(!isAddEventModalVisible)}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesomeIcon icon={plusIcon} size={21} color={"#A96500"} />
              <Text style={styles.addEvent}>Add event</Text>
              <ModalAddEvent
                visible={isAddEventModalVisible}
                title="Add Event"
                onQuit={() => setAddEventModalVisible(!isAddEventModalVisible)}
                navigation={props.navigation}
              ></ModalAddEvent>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>
      <EventSlider
        style={styles.slider}
        altBg={props.altBg}
        expandable={props.expandable}
        navigation={props.navigation}
        cards={props.data}
      ></EventSlider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginBottom: "60%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "visible",
    position: "relative",
  },
  headerText: {
    fontFamily: "ComfortaaBold",
    fontSize: 20,
    color: colors.white,
  },
  addEvent: {
    fontFamily: "ComfortaaBold",
    fontSize: 16,
    color: colors.white,
    paddingLeft: 5,
    margin: 0,
  },
  headerWrapper: {
    padding: "5%",
    paddingTop: "14%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slider: { position: "absolute", top: "60%", left: 0 },
});

export default EventSection;
