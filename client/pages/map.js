import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker, Animated } from "react-native-maps";
import HomeMenu from "../components/shared/HomeMenu";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import backgroundImage from "../assets/eventbg.png";


const Map = ({ pickLocation, navigation, route }) => {
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
  const [marker, setMarker] = useState(null);
  const [markersArray, setMarkersArray] = useState([
    {
      latitude: 51.58854899559891,
      longitude: 18.937285803258415,
    },
    {
      latitude: 51.58914308764534,
      longitude: 18.936975337564945,
    },
    {
      latitude: 51.58981070285168,
      longitude: 18.939508348703384,
    },
  ]);
  const { eventList } = useSelector((state) => state.event);


  const setMarkerPin = (coords) => {
    setMarker(coords);
    //TODO: Wywolanie metody wybierania lokalizacji
  };

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

  const pinColor = "#474744";

  return (
    <View style={styles.container}>
      {/* {console.log(eventList)} */}
      <TopBar
        title
        leftIcon={faArrowLeft}
        color={colors.blackPrimary}
        onPressLeft={() => {
          // console.log(marker)
          // navigation.state.params.onGoBack(marker)
          navigation.goBack();
        }}
      />
      {location.coords.latitude == 0 ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}
        >
          <>
            {eventList ? (
              eventList.map((marker, i) => (
                <Marker
                  key={i + 1}
                  coordinate={{
                    latitude: parseFloat(marker.location.latitude),
                    longitude: parseFloat(marker.location.longitude),
                  }}
                  pinColor="green"
                />
              ))
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
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}
        >
          <>
          {eventList ? (
              eventList.map((marker, i) => (
                <Marker
                  key={i + 1}
                  coordinate={{
                    latitude: parseFloat(marker.location.latitude),
                    longitude: parseFloat(marker.location.longitude),
                  }}
                  pinColor="green"
                />
              ))
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
      {/* <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        >

              {
                console.log(eventList[0].name),
                console.log(eventList[1].name),
                console.log(eventList[2].name)
                eventList.map((marker, i) => (
                  <View style={styles.card} key={i}>
                    <Image 
                      source={backgroundImage}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>{marker.name}</Text>
                    </View>

                  </View>
                ))
              }
      </Animated.ScrollView> */}
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
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
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
    height: 250,
    width: "70%",
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
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
});

export default Map;
