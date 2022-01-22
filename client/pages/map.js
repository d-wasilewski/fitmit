import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import HomeMenu from "../components/shared/HomeMenu";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import backgroundImage from "../assets/basketball.png";
import backgroundImages from "../utils/backgroungImages";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Map = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const CARD_WIDTH = width * 0.8;
  const [location, setLocation] = useState({
    timestamp: 0,
    mocked: false,
    coords: {
      altitude: 0,
      heading: 0,
      altitudeAccuracy: 0,
      latitude: 0,
      speed: 0,
      longitude: 0,
      accuracy: 0,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const { eventList } = useSelector((state) => state.event);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0015,
  };

  const region2 = {
    latitude: parseFloat(eventList[0].location.latitude),
    longitude: parseFloat(eventList[0].location.longitude),
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0015,
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= eventList.length) {
        index = eventList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex != index) {
          mapIndex = index;
          const { location } = eventList[index];
          _map.current.animateToRegion(
            {
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
              // ...location,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = eventList.map((marker, i) => {
    const inputRange = [
      (i - 1) * CARD_WIDTH,
      i * CARD_WIDTH,
      (i + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const [locateMe, setLocateMe] = useState(true);
  useEffect(() => {
    if (location.latitude != "" && location.longitude != "") {
      _map.current.animateToRegion(
        {
          latitude: parseFloat(location.coords.latitude),
          longitude: parseFloat(location.coords.longitude),
          // ...location,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        },
        350
      );
    }
  }, [locateMe]);

  const _map = React.useRef(null);

  return (
    <View style={styles.container}>
      <TopBar
        title
        leftIcon={faArrowLeft}
        color={colors.blackPrimary}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {location.coords.latitude == 0 ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          ref={_map}
        ></MapView>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region2}
          ref={_map}
        >
          <>
            {eventList ? (
              eventList.map((marker, i) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[i].scale,
                    },
                  ],
                };
                return (
                  <Marker
                    key={i + 1}
                    coordinate={{
                      latitude: parseFloat(marker.location.latitude),
                      longitude: parseFloat(marker.location.longitude),
                    }}
                    // pinColor="green"
                  >
                    <Animated.View style={[styles.markerWrap]}>
                      <Animated.Image
                        source={
                          backgroundImages[marker.eventType.toLowerCase()].uri
                        }
                        style={[styles.marker, scaleStyle]}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </Marker>
                );
              })
            ) : (
              <></>
            )}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </>
        </MapView>
      )}
      <View style={styles.myLocation}>
        <Pressable style={styles.icon} onPress={() => setLocateMe(!locateMe)}>
          <FontAwesomeIcon icon={faLocationArrow} size={25} />
        </Pressable>
      </View>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: width * 0.1 - 10,
          bottom: 0,
          right: width * 0.1 - 10,
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === "android" ? width * 0.075 : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {eventList.map((marker, i) => (
          <View style={[styles.card]} key={i}>
            <Image
              source={backgroundImages[marker.eventType.toLowerCase()].uri}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.name}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.eventType}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      <HomeMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scrollView: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingVertical: 10,
    // width: "100%",
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 200,
    width: Dimensions.get("window").width * 0.8,
    overflow: "hidden",
  },
  cardImage: {
    flex: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
  },
  marker: {
    width: 45,
    height: 45,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.greenTriary,
  },
  myLocation: {
    position: "absolute",
    bottom: 350,
    right: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 99,
    backgroundColor: colors.blackPrimary,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Map;
