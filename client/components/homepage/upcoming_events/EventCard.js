import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../../styles/colors";
import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import backgroundImages from "../../../utils/backgroungImages";
import moment from "moment";
import { useSelector } from "react-redux";

const EventCard = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const { location } = useSelector((state) => state.user);
  const [distance, setDistance] = useState("6.9");
  const { style, altBg, data } = props;

  const { name = "", date = new Date(), eventType } = data;
  const eventTime = new Date(date);
  const weekDay = getWeekDay(eventTime);

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

  function calcDistance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = toRad(lon1);
    lon2 = toRad(lon2);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;

    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result

    return c * r;
  }

  useEffect(() => {
    const d = calcDistance(
      parseFloat(data.location.latitude),
      location.latitude,
      parseFloat(data.location.longitude),
      location.longitude
    ).toFixed(1);
    setDistance(d);
  }, [location]);

  // Converts numeric degrees to radians
  function toRad(val) {
    return (val * Math.PI) / 180;
  }

  function getWeekDay(date) {
    today = new Date();
    eventDate = date;
    difference = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
    switch (difference) {
      case -1:
        return "Yesterday";
      case 0:
        return "Today";
      case 1:
        return "Tomorrow";
      default:
        return `In ${difference} days`;
    }
  }

  const additionalStyle = altBg ? styles.altBgColor : {};
  const gradientColors = altBg
    ? ["#FF9900", "#503000"]
    : ["#00B26A", "#002818"];

  return (
    <View style={[styles.container, { width: windowWidth * 0.88 }, style]}>
      {/* Obrazek */}
      <ImageBackground
        source={backgroundImages[eventType.toLowerCase()].uri}
        resizeMode="cover"
        style={{ flex: 1 }}
      />
      {/* Panel na dole */}
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
        start={{ x: 0, y: 1 }}
        end={{ x: 0.9, y: 0.1 }}
      >
        <View style={styles.bottomWrapper}>
          <View>
            {/* Nazwa grupy wydarzenia */}
            <View style={styles.groupNameWrapper}>
              <Text style={styles.groupName}>{name}</Text>
            </View>
            {/* Nazwa wydarzenia */}
            <Text
              style={[
                styles.fontBold,
                {
                  fontSize: 10,
                  fontFamily: "ComfortaaRegular",
                  color: colors.grey100,
                },
              ]}
            >
              {eventType}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            {/* Element kalendarzowy */}
            <View style={[styles.calendarWrapper, additionalStyle]}>
              <FontAwesomeIcon
                icon={faCalendar}
                color={colors.white}
                size={22}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.fontBold]}>{weekDay}</Text>
                <Text style={[styles.fontBold]}>
                  {eventTime != undefined
                    ? moment(date).format("HH") +
                      ":" +
                      moment(date).format("MM")
                    : ""}
                </Text>
              </View>
            </View>
            {/* Odleglosc */}
            <View style={styles.distanceWrapper}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                color={altBg ? colors.orange : colors.greenSecondary}
                size={14}
              />
              <Text
                style={[
                  styles.fontBold,
                  { fontSize: 13, marginLeft: 3, marginTop: 3 },
                ]}
              >
                {distance + " km"}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 10,
    flex: 1,
    flexDirection: "column",
    // border radius fix
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: 60,
    overflow: "visible",
  },
  fontBold: {
    fontFamily: "ComfortaaBold",
    color: colors.white,
    fontSize: 14,
  },
  bottomWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: "3%",
    paddingHorizontal: "5.25%",
  },
  calendarWrapper: {
    backgroundColor: colors.greenSecondary,
    borderRadius: 10,
    padding: 10,
    zIndex: 5,
    elevation: 5,
    position: "relative",
    top: -10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  altBgColor: { backgroundColor: colors.orange },
  distanceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupName: {
    color: colors.white,
    fontFamily: "ComfortaaRegular",
    fontSize: 18,
  },
  groupNameWrapper: {
    flexDirection: "row",
    marginBottom: 2,
  },
});

export default EventCard;
