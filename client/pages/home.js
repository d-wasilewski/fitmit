import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";
import { useSelector, useDispatch } from "react-redux";

import { faQuidditch } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import TopBar from "../components/shared/TopBar";
import HomeMenu from "../components/shared/HomeMenu";
import Greeting from "../components/homepage/Greeting";
import ActivityCard from "../components/homepage/activities/ActivityCard";
import ActivitySlider from "../components/homepage/activities/ActivitySlider";
import EventCard from "../components/homepage/upcoming_events/EventCard";
import EventSlider from "../components/homepage/upcoming_events/EventSlider";
import EventSection from "../components/homepage/EventSection";
import GenericCard from "../components/homepage/cards/GenericCard";
import GenericCardHolder from "../components/homepage/cards/GenericCardHolder";
import GroupsCard from "../components/homepage/cards/GroupsCard";

import { logoutUser } from "../redux/actions/userActions";
import GroupProfile from "./groupProfile";

const Home = ({ navigation }) => {
  const { username } = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  const leftIconPress = () => {
    dispatch(logoutUser());
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Greeting username={username}></Greeting>

        {/* Dodac jeszcze przy wartosci m, kcal i hr */}
        <ActivitySlider />
        <EventSection />
        <GroupsCard navigation={navigation} />
        {/* <GenericCardHolder
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
        ></GenericCardHolder> */}
      </ScrollView>
      <View style={[styles.boxBehindLogo, { height: height * 0.1 }]}>
        <TopBar
          leftIcon={faQuidditch}
          rightIcon={faBell}
          color={colors.greenSecondary}
          onPressLeft={leftIconPress}
        />
      </View>
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
  boxBehindLogo: {
    width: "100%",

    backgroundColor: colors.blackPrimary,
    position: "absolute",
  },
});

export default Home;
