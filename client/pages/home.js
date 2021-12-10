import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";
import { useSelector } from "react-redux";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import TopBar from "../components/TopBar";
import HomeMenu from "../components/HomeMenu";
import Greeting from "../components/homepage/Greeting";
import ActivityCard from "../components/homepage/activities/ActivityCard";
import ActivitySlider from "../components/homepage/activities/ActivitySlider";
import EventCard from "../components/homepage/upcoming_events/EventCard";
import EventSlider from "../components/homepage/upcoming_events/EventSlider";
import EventSection from "../components/homepage/EventSection";
import GenericCard from "../components/homepage/cards/GenericCard";
import GenericCardHolder from "../components/homepage/cards/GenericCardHolder";

const Home = ({ navigation }) => {
  const { username } = useSelector((state) => state.user.user);

  return (
    <View style={styles.container}>
      <TopBar
        leftIcon={faBars}
        rightIcon={faBell}
        color={colors.greenSecondary}
        onPressLeft={() => navigation.navigate("Home")}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* todo zmienic na dynamiczne */}
        <Greeting username={username}></Greeting>
        {/* podac dane w postaci cards= ... */}
        {/* Dodac jeszcze przy wartosci m, kcal i hr */}
        <ActivitySlider></ActivitySlider>
        <EventSection></EventSection>
        <GenericCardHolder
          title="Groups"
          cards={[
            { data: { title: "Dronszki s pyponszem", text: "Damian: JD" } },
            { data: { title: "Dronszkponszem", text: "Miciu: JD" } },
            { data: { title: "Dronszonszem", text: "Damidasan: JD" } },
            { data: { title: "Dronsonszem", text: "Damidsaan: JD" } },
            { data: { title: "Dronszknszem", text: "Damiadsadn: JD" } },
            { data: { title: "Dronszki s pypzem", text: "Damian: JadsdasD" } },
          ]}
        ></GenericCardHolder>
        <GenericCardHolder
          title="Friends"
          colors={["rgba(255, 0, 168, 0.2) ", "rgba(38, 38, 38, 0.1)"]}
          cards={[
            { data: { title: "Dronszki s pyponszem", text: "Damian: JD" } },
            { data: { title: "Dronszkponszem", text: "Miciu: JD" } },
            { data: { title: "Dronszonszem", text: "Damidasan: JD" } },
            { data: { title: "Dronsonszem", text: "Damidsaan: JD" } },
            { data: { title: "Dronszknszem", text: "Damiadsadn: JD" } },
            { data: { title: "Dronszki s pypzem", text: "Damian: JadsdasD" } },
          ]}
        ></GenericCardHolder>
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
    marginTop: "30%",
    paddingBottom: 200,
  },
});

export default Home;
