import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import TopBar from "../components/TopBar";
import HomeMenu from "../components/HomeMenu";
import Greeting from "../components/homepage/Greeting";
import ActivityCard from "../components/homepage/activities/ActivityCard";
import ActivitySlider from "../components/homepage/activities/ActivitySlider";
import EventCard from "../components/homepage/upcoming_events/EventCard";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TopBar
        leftIcon={faBars}
        rightIcon={faBell}
        color={colors.greenSecondary}
        onPressLeft={() => navigation.navigate("Home")}
      />
      <ScrollView contentContainerStyle={styles.content}>
        {/* todo zmienic na dynamiczne */}
        <Greeting username="Miciu"></Greeting>
        {/* podac dane w postaci cards= ... */}
        {/* Dodac jeszcze przy wartosci m, kcal i hr */}
        <ActivitySlider></ActivitySlider>
        <ScrollView>
          <EventCard></EventCard>
        </ScrollView>
      </ScrollView>
      <HomeMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: colors.blackPrimary,
  },
  content: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "40%",
    paddingBottom: 200,
  },
});

export default Home;
