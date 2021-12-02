import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import EventSlider from "./upcoming_events/EventSlider";
import bgImg from "../../assets/greenwavy.png";
import colors from "../../styles/colors";

const EventSection = (props) => {
  const windowWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    headerText: {
      fontFamily: "ComfortaaBold",
      fontSize: 20,
      color: colors.white,
    },
    headerWrapper: {},
    slider: { position: "relative", top: 100 },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImg}
        resizeMode="cover"
        style={{ width: "100%" }}
      >
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Upcoming Events</Text>
        </View>
        <EventSlider style={styles.slider}></EventSlider>
      </ImageBackground>
    </View>
  );
};

export default EventSection;
