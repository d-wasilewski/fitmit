import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import EventSlider from "./upcoming_events/EventSlider";
import bgImg from "../../assets/greenwavy.png";
import bgImgOrange from "../../assets/orangewavy.png";
import colors from "../../styles/colors";

const EventSection = (props) => {
  const backgroundImage = props.altBg ? bgImgOrange : bgImg;

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
    headerWrapper: { padding: "7%", paddingTop: "14%" },
    slider: { position: "absolute", top: "60%", left: 0 },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: "100%", minHeight: 150 }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Upcoming Events</Text>
        </View>
      </ImageBackground>
      <EventSlider
        style={styles.slider}
        altBg={props.altBg}
        expandable={props.expandable}
      ></EventSlider>
    </View>
  );
};

export default EventSection;
