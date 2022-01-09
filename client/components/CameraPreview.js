import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import colors from "../styles/colors";


const CameraPreview = ({photo, retakePicture, savePicture}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={retakePicture}>
          <Text style={{color: colors.white}}>Retake picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={savePicture}
          >
          <Text style={{color: colors.white}}>Use that photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    buttons: {
      position: "absolute",
      bottom: 0,
      width: "90%",
      marginLeft: "5%",
      justifyContent: "space-between",
      flexDirection: "row",
      height: "7%",
    },
    retakeButton: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "40%",
      backgroundColor: colors.greenSecondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    saveButton: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "40%",
      backgroundColor: colors.greenSecondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    }

});

export default CameraPreview;
