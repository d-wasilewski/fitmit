import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, } from 'react-native';
import React, { useEffect, useState } from "react";
import { Camera } from 'expo-camera';
import CameraPreview from './CameraPreview';

const CameraLauncher = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const { height, width } = useWindowDimensions();
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] =  useState(false);

    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)

    const prepareRatio = async () => {
      let desiredRatio = '4:3';
      if (Platform.OS === 'android') {
        const ratios = await camera.getSupportedRatiosAsync();
  
        let distances = {};
        let realRatios = {};
        let minDistance = null;
        for (const ratio of ratios) {
          const parts = ratio.split(':');
          const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
          realRatios[ratio] = realRatio;
          const distance = screenRatio - realRatio; 
          distances[ratio] = realRatio;
          if (minDistance == null) {
            minDistance = ratio;
          } else {
            if (distance >= 0 && distance < distances[minDistance]) {
              minDistance = ratio;
            }
          }
        }
        desiredRatio = minDistance;
        const remainder = Math.floor(
          (height - realRatios[desiredRatio] * width) / 2
        );
        setImagePadding(remainder);
        setRatio(desiredRatio);
        setIsRatioSet(true);
      }
    };

    const setCameraReady = async() => {
      if (!isRatioSet) {
        await prepareRatio();
      }
    };

    const takePicture = async () => {
      const photo = await camera.takePictureAsync()
      setPreviewVisible(true)
      setCapturedImage(photo)

    }

    const retakePicture = () => {
      setCapturedImage(null)
      setPreviewVisible(false)
    }

    const savePicture = () => {
      const pic = capturedImage;
      setCapturedImage(null);
      setPreviewVisible(false);
      navigation.navigate("User", pic);
    }
   
    return ( 
      <View style={styles.container}>
      {previewVisible && capturedImage ? (
            <CameraPreview 
              savePicture={savePicture} 
              retakePicture={retakePicture}
              photo={capturedImage} />
          ) : (
      <Camera
        style={[styles.cameraPreview, {marginTop: imagePadding, marginBottom: imagePadding}]}
        onCameraReady={setCameraReady}
        ratio={ratio}
        ref={(ref) => {
          setCamera(ref);
        }}>
        <View
          style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          padding: 20,
          justifyContent: 'space-between'
          }}
        >
          <View
          style={{
          alignSelf: 'center',
          flex: 1,
          alignItems: 'center'
          }}
          >
              <TouchableOpacity
              onPress={takePicture}
              style={styles.takePictureButton}
              />
          </View>
        </View>
      </Camera>
      )}
    </View>
     );

     
}
const styles = StyleSheet.create({
    information: { 
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center'
    },
    cameraPreview: {
      flex: 1,
    },
    takePictureButton: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
      backgroundColor: '#fff'
    }
  });
  
export default CameraLauncher;