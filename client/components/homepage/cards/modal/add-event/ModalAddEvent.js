import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

import colors from "../../../../../styles/colors";
import ModalDatePicker from "../ModalDatePicker";
import ModalDropdownItem from "../ModalDropdownItem";
import ModalDropdownMenu from "../ModalDropdownMenu";
import ModalInput from "../ModalInput";
import ModalTimePicker from "../ModalTimePicker";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { createEvent } from "../../../../../redux/actions/eventActions";
import useIsMounted from "../../../../../hooks/useIsMounted";

const ModalAddEvent = (props) => {
  const { visible, title, onQuit, navigation, route } = props;
  const dateNow = new Date();
  const marginSize = Dimensions.get("screen").height * 0.08;
  const buttonTopMargin = marginSize * 0.3;
  const [eventType, setEventType] = useState(null);
  const dispatch = useDispatch();
  const [marker, setMarker] = useState(null);
  const heightFromDimensions = Dimensions.get("window").height * 0.4;
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
  const [eventDate, setEventDate] = useState(dateNow);
  const [hours, setHours] = useState(dateNow.getHours());
  const [minutes, setMinutes] = useState(dateNow.getMinutes());
  const [notification, setNotification] = useState(false);
  const { currentGroup } = useSelector((state) => state.groups);
  const currentUser = useSelector((state) => state.user.user);
  const notificationListener = useRef();
  const responseListener = useRef();
  const isMounted = useIsMounted();

  async function createNewEvent(obj) {
    dispatch(createEvent(obj));
  }

  function getData() {
    const name = currentGroup.name;
    const groupId = currentGroup._id;
    const userId = currentUser._id;

    return {
      name: name,
      creator: userId,
      eventType: eventType,
      group: groupId,
      location: marker,
      date: eventDate.setHours(hours, minutes),
    };
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0015,
  };

  const setMarkerPin = (coords) => {
    setMarker(coords);
    //TODO: Wywolanie metody wybierania lokalizacji
  };

  async function sendPushNotification() {
    let tokensToNotify = [];

    // TODO: usunac powiadomienia dla twórcy
    currentGroup.members.map((member) => {
      if (member["pushToken"] !== undefined) {
        tokensToNotify.push(member["pushToken"]);
      }
    });

    const message = {
      to: tokensToNotify,
      sound: "default",
      title: "New event",
      body: `${currentUser.username} created new event in ${currentGroup.name}!`,
      data: { someData: currentGroup._id },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    // console.log("Notification: ", notification);

    // This listener is fired whenever a user taps on or interacts with a notification
    //  (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <View style={[styles.content, { marginTop: marginSize }]}>
          <View style={styles.headerWrapper}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <ScrollView
              style={styles.cardsWrapper}
              showsVerticalScrollIndicator={false}
            >
              <ModalDropdownMenu
                title="Event type"
                style={styles.elementMargin}
                onUpdate={setEventType}
                label="😎 select sport"
              >
                <ModalDropdownItem label="🏀 Basketball" value="BASKETBALL" />
                <ModalDropdownItem label="🏐 Volleyball" value="VOLLEYBALL" />
                <ModalDropdownItem label="🏓 Pingpong" value="PINGPONG" />
                <ModalDropdownItem label="⚽ Football" value="FOOTBALL" />
                <ModalDropdownItem
                  label="🦍 Calisthenics"
                  value="CALISTHENICS"
                />
              </ModalDropdownMenu>
              <View style={[styles.pickerWrapper, styles.elementMargin]}>
                <ModalDatePicker
                  title="Date"
                  style={{ width: "50%" }}
                  onChange={setEventDate}
                  value={moment(eventDate).format("l")}
                />
                <ModalTimePicker
                  title="Time"
                  style={{ width: "45%" }}
                  onChange={(hours, minutes) => {
                    setHours(hours);
                    setMinutes(minutes);
                  }}
                  hours={hours}
                  minutes={minutes}
                />
              </View>
              <View
                style={[styles.eventLocation, { height: heightFromDimensions }]}
              >
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{ height: heightFromDimensions, width: "100%" }}
                  initialRegion={region}
                  onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}
                >
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                  />
                  {marker ? (
                    <Marker
                      draggable
                      coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                      }}
                      pinColor="green"
                    />
                  ) : (
                    <></>
                  )}
                </MapView>
              </View>
            </ScrollView>
          </View>
          <View style={[styles.buttonsWrapper, { marginTop: buttonTopMargin }]}>
            <Pressable
              onPress={() => {
                onQuit();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.red,
                  borderBottomColor: colors.darkRed,
                },
              ]}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
            <Pressable
              on
              onPress={async () => {
                const data = getData();
                createNewEvent(data);
                if (isMounted.current) {
                  await sendPushNotification();
                }
                onQuit();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.greenSecondary,
                  borderBottomColor: colors.greenTriary,
                },
              ]}
            >
              <Text style={styles.buttonText}>ACCEPT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.blackSecondary,
    width: "88%",
    height: "80%",
    borderRadius: 20,
    overflow: "visible",
    alignItems: "center",
  },
  text: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.blackPrimary,
    textAlign: "center",
  },
  headerWrapper: {
    backgroundColor: colors.orange,
    paddingVertical: 17,
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentWrapper: {
    width: "90%",
    height: "75%",
    alignItems: "center",
    paddingTop: 20,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "100%",
  },
  buttonsWrapper: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: "blue",
    borderRadius: 5,
    borderBottomWidth: 3,
  },
  buttonText: {
    fontFamily: "RobotoBold",
    fontSize: 18,
    color: colors.white,
  },
  elementMargin: {
    marginTop: 20,
  },
  pickerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  eventLocation: {
    marginTop: "5%",
    height: 300,
    width: "100%",
    overflow: "hidden",
    borderRadius: 10,
  },
  eventLocationM: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    // overflow: 'hidden',
    // borderRadius: 10
  },
  map: {
    // height: Dimensions.get('window').height,
    height: 300,
    width: "100%",
    // zIndex: 10
  },
  mapM: {
    // height: Dimensions.get('window').height,
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    // zIndex: 10
  },
});

export default ModalAddEvent;
