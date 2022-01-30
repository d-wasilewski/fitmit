import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

setTestDeviceIDAsync('EMULATOR');


const HomeMenu = ({ navigation, color = colors.greenSecondary }) => {
  const { height, width } = useWindowDimensions();
  return (
    <>
    <View style={[styles.wrapper]}>
     <AdMobBanner
      bannerSize="fullBanner"
      adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
      servePersonalizedAds // true or false
      onDidFailToReceiveAdWithError={this.bannerError} />
    </View>

    <View style={[styles.container, { height: height * 0.08, width }]}>
   
      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <FontAwesomeIcon
          icon={faMapMarked}
          style={[styles.icon, { color }]}
          size={28}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesomeIcon
          icon={faHome}
          style={[styles.icon, { color }]}
          size={28}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("User")}>
        <FontAwesomeIcon
          icon={faUserCircle}
          style={[styles.icon, { color }]}
          size={28}
        />
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: Dimensions.get("window").height *0.08,
    left: 0,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.blackSecondary,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.greenSecondary,
    marginHorizontal: 25,
  },
});
export default HomeMenu;
