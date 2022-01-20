import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Platform, Text, View, StyleSheet, Dimensions, ScrollView, Image, Animated } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import HomeMenu from "../components/shared/HomeMenu";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import backgroundImage from "../assets/eventbg.png";


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
        if (mapIndex != index ) {
          mapIndex = index;
          const { location } = eventList[index];
          console.log(location);
          _map.current.animateToRegion(
            {
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
              // ...location,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            500
          )
        }
      }, 10);
    })
  });

  const interpolations = eventList.map((marker, i) => {
    const inputRange = [
      (i - 1) * CARD_WIDTH,
      i * CARD_WIDTH,
      ((i + 1) * CARD_WIDTH), 
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  })

  const _map = React.useRef(null);

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
          ref={_map}
        >
          <>
            {eventList.map((marker, i) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[i].scale,
                  },
                ]
              }
              return(
                <Marker
                  key={i + 1}
                  coordinate={{
                    latitude: parseFloat(marker.location.latitude),
                    longitude: parseFloat(marker.location.longitude),
                  }}
                  pinColor="green"
                />
            )})
            }
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
          ref={_map}
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
                  // pinColor="green"
                >
                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image 
                      source={backgroundImage}
                      style={[styles.marker]}
                      resizeMode="cover"
                    />
                  </Animated.View>  
                </Marker>
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
          right: width * 0.1 - 10
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? width * 0.1 - 10 : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              }
            }
          ],
          {useNativeDriver: true}
        )}
        >
              {
                // console.log(eventList),
                // console.log(eventList[1].name),
                // console.log(eventList[2].name)
                eventList.map((marker, i) => (
                  <View style={[styles.card]} key={i}> 
                    <Image 
                      source={backgroundImage}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>{marker.eventType}</Text>
                    </View>

                  </View>
                ))
              }
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
    // backgroundColor:"red"
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
    width: 300,
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
    width:50,
    height:50,
    // backgroundColor:"red"
  },
  marker: {
    // backgroundColor:"blue", 
    width: 50,
    height: 50,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "black"
  },
});

export default Map;
