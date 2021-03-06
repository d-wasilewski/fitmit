import React, { useState, useEffect, Fragment } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const MapPicker = ({ pickLocation, navigation }) => {
    const [location, setLocation] = useState({"timestamp":0,"mocked":false,"coords":{"altitude":0,"heading":0,"altitudeAccuracy":0,"latitude":0,"speed":0,"longitude":0,"accuracy":0}});
    const [errorMsg, setErrorMsg] = useState(null);
    const [marker, setMarker] = useState(null); 
    const [markersArray, setMarkersArray] = useState([ 
        {
            "latitude": 51.58854899559891,
            "longitude": 18.937285803258415,
        },
        {
            "latitude": 51.58914308764534,
            "longitude": 18.936975337564945,
        },
        {
            "latitude": 51.58981070285168,
            "longitude": 18.939508348703384
          }
    ]); 

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
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        
        text = JSON.stringify(location);
        
      }
    
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0115,
        longitudeDelta: 0.0015
      };

      const pinColor = '#474744';

      return (
        <View style={styles.container}>
          <MapView provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onPress={(e) => setMarkerPin(e.nativeEvent.coordinate)}>
            <Marker 
                            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                        />
          </MapView>
        </View>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          overflow: "hidden"

        },
        paragraph: {
          fontSize: 18,
          textAlign: 'center',
        },
        map: {
        //   width: Dimensions.get('window').width,
        //   height: Dimensions.get('window').height,
        height: 150,
        width: "100%",

        },
      });

export default MapPicker;