import React, { useEffect } from "react";
import {
  View,
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
import ActivitySlider from "../components/homepage/activities/ActivitySlider";
import EventSection from "../components/homepage/EventSection";
import GroupsCard from "../components/homepage/cards/GroupsCard";
import { logoutUser } from "../redux/actions/userActions";
import { getEvents } from "../redux/actions/eventActions";

const Home = ({ navigation }) => {
  const { username, _id } = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  useEffect(() => {
    dispatch(getEvents(_id));
  }, [username]);

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
        <ActivitySlider />
        <EventSection />
        <GroupsCard navigation={navigation} />
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
