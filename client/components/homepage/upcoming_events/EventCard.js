import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import backgroundImage from "../../../assets/eventbg.png";
import colors from "../../../styles/colors";
import { faCalendar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import avatar from "../../../assets/papaj.jpg";

const EventCard = (props) => {
  const windowWidth = Dimensions.get("window").width;

  // dodac obiekt eventu z danymi
  const {
    users = [
      { name: "papaj" },
      { name: "papaj" },
      { name: "papaj" },
      { name: "papaj" },
      { name: "papaj" },
    ],
    style,
    altBg,
  } = props;

  const additionalStyle = altBg ? styles.altBgColor : {};
  const gradientColors = altBg
    ? ["#FF9900", "#503000"]
    : ["#00B26A", "#002818"];

  return (
    <View style={[styles.container, { width: windowWidth * 0.88 }, style]}>
      {/* Obrazek */}
      <ImageBackground
        source={backgroundImage}
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
            {/* Avatary uczestnikow */}
            <View style={styles.avatarWrapper}>
              {/* Dodac obrazek przy max ilosci mozliwych do wyswietlenia uzytkownikow */}
              {users.map((user, index) => {
                return (
                  <Image
                    // do poprawy key
                    key={user.name + index}
                    source={avatar}
                    style={[styles.userAvatar, { left: -7 * index }]}
                  />
                );
              })}
            </View>
            {/* Nazwa wydarzenia */}
            <Text
              style={[
                styles.fontBold,
                { fontSize: 16, fontFamily: "ComfortaaRegular" },
              ]}
            >
              Drążkowe Świry
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
                <Text style={[styles.fontBold]}>Today</Text>
                <Text style={[styles.fontBold]}>14:00</Text>
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
                6.9 km
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
    paddingHorizontal: "6.25%",
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
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 999,
    position: "relative",
    // czy ten shadow dziala to chuj wie xD
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  avatarWrapper: {
    flexDirection: "row",
    marginBottom: 8,
  },
});

export default EventCard;
