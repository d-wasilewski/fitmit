import moment from "moment";
import React, { useState, useEffect } from "react";
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
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import MapPicker from "./MapPicker";
import colors from "../../../../../styles/colors";
import ModalDatePicker from "../ModalDatePicker";
import ModalDropdownItem from "../ModalDropdownItem";
import ModalDropdownMenu from "../ModalDropdownMenu";
import ModalInput from "../ModalInput";
import ModalTimePicker from "../ModalTimePicker";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';



const ModalAddEvent = (props) => {
  const { visible, title, onQuit, navigation, route } = props;
  const marginSize = Dimensions.get("screen").height * 0.08;
  const buttonTopMargin = marginSize * 0.3;

  const [eventType, setEventType] = useState(null);
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [marker, setMarker] = useState(null); 
  const [maximize, setMaximize] = useState(false);

  const heightFromDimensions = Dimensions.get('window').height * 0.4;
  console.log(heightFromDimensions)

  // const [location, setLocation] = useState(true)

  const [location, setLocation] = useState({"timestamp":0,"mocked":false,"coords":{"altitude":0,"heading":0,"altitudeAccuracy":0,"latitude":0,"speed":0,"longitude":0,"accuracy":0}});


  console.log(eventDate.toLocaleDateString(), eventTime.toLocaleTimeString());
  const actualDate = new Date(eventDate);
  actualDate.setHours(eventTime.getHours(), eventTime.getMinutes(), 0);
  // console.log("Transformed date:", actualDate.toLocaleString());

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0015
  };

  const setMarkerPin = (coords) => {
    setMarker(coords)
    //TODO: Wywolanie metody wybierania lokalizacji
}

useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      setLocation(location);
    })();
  }, []);


  return (
    <Modal visible={visible}  animationType="slide">
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
              <ModalInput title="Event name" placeholder="name" />
              <ModalDropdownMenu
                title="Event type"
                style={styles.elementMargin}
                onUpdate={setEventType}
                label="😎 select sport"
              >
                <ModalDropdownItem label="🏀 Basketball" value="BASKETBALL" />
                <ModalDropdownItem label="🏐 Volleyball" value="VOLLEYBALL" />
                <ModalDropdownItem label="🏓 Pipong" value="PIPONG" />
                <ModalDropdownItem
                  label="⚽ JARANIE SIĘ PIŁKĄ NOŻNĄ TO"
                  value="FOOTBALL"
                />
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
                  onChange={(event, time) => {
                    setEventTime(time);
                  }}
                  value={eventTime}
                />
              </View>
              <Pressable>
                {true ? (
                  <View style={[styles.eventLocation, {height: heightFromDimensions}]}>
                    <MapView provider={PROVIDER_GOOGLE}
                      style={{height: heightFromDimensions, width: "100%"}}
                      initialRegion={region}
                      onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}>
                      <Marker 
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                      />
                      {marker ? (
                        <Marker 
                          draggable 
                          coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
                          pinColor="green"
                        />
                      ) : (
                        <></>
                      )}
                    </MapView>
                  </View>
                ) : (
                  <View style={[styles.eventLocationM, {height: heightFromDimensions}]}>
                  <MapView provider={PROVIDER_GOOGLE}
                    style={styles.mapM}
                    initialRegion={region}
                    onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}>
                    <Marker 
                      coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                    />
                    {marker ? (
                      <Marker 
                        draggable 
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}} 
                        pinColor="green"
                      />
                    ) : (
                      <></>
                    )}
                  </MapView>
                </View>
                )}
              </Pressable>
              
            </ScrollView>
          </View>
          <View style={[styles.buttonsWrapper, { marginTop: buttonTopMargin }]}>
            <Pressable
              onPress={onQuit}
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
              onPress={onQuit}
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
    // height: "40%", 
    width: "100%",
    overflow: 'hidden',
    borderRadius: 10
  },
  eventLocationM: {

    height: Dimensions.get('screen').height, 
    width: Dimensions.get('screen').width, 
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
    height: Dimensions.get('screen').height, 
    width: Dimensions.get('screen').width, 

    // zIndex: 10
  },
});

export default ModalAddEvent;
