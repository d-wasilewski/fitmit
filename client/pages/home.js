import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import colors from "../styles/colors";
import { useSelector, useDispatch } from "react-redux";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import TopBar from "../components/shared/TopBar";
import HomeMenu from "../components/shared/HomeMenu";
import Greeting from "../components/homepage/Greeting";
import ActivitySlider from "../components/homepage/activities/ActivitySlider";
import EventSection from "../components/homepage/EventSection";
import GroupsCard from "../components/homepage/cards/GroupsCard";
import { logoutUser, updateUserData } from "../redux/actions/userActions";
import { getEvents } from "../redux/actions/eventActions";
import GenericAd from "../components/homepage/GenericAd";
import { SET_LOCATION } from "../redux/types";


// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded,
//   setTestDeviceIDAsync,
// } from 'expo-ads-admob';
// setTestDeviceIDAsync('EMULATOR');

const Home = ({ navigation }) => {
  const {
    username,
    _id,
    premium = "error",
  } = useSelector((state) => state?.user?.user);
  const { currentEvents } = useSelector((state) => state?.event);
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  useEffect(() => {
    dispatch(getEvents(_id));
  }, [currentEvents]);

  const leftIconPress = () => {
    dispatch(logoutUser());
    navigation.navigate("Login");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      await Location.watchPositionAsync(
        {
          timeInterval: 5000,
          accuracy: Location.Accuracy.High,
        },
        (loc) => {
          const payload = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };

          dispatch({ type: SET_LOCATION, payload: payload });
        }
      );
    })();
  }, []);

  // const funkcja = async () => {
  //   await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
  //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  //   await AdMobInterstitial.showAdAsync();
  // }

  // funkcja()

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl />}
      >
        <Greeting username={username}></Greeting>
        <ActivitySlider />

        <EventSection />
        
        
        <GroupsCard navigation={navigation} />
      </ScrollView>
      <View style={[styles.boxBehindLogo, { height: height * 0.1 }]}>
        <TopBar
          leftIcon={
            <SimpleLineIcons
              name="logout"
              size={24}
              color={colors.greenSecondary}
            />
          }
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
    paddingBottom: 250,
  },
  boxBehindLogo: {
    width: "100%",
    backgroundColor: colors.blackPrimary,
    position: "absolute",
  },
});

export default Home;
