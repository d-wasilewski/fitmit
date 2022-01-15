import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Camera } from "expo-camera";
import CameraPreview from "./CameraPreview";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import TopBar from "./shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CameraLauncher = ({ navigation, route }) => {
  const [camera, setCamera] = useState(null);
  const { height, width } = useWindowDimensions();
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const prepareRatio = async () => {
    let desiredRatio = "4:3";
    if (Platform.OS === "android") {
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
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

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const takePicture = async () => {
    const photo = await camera.takePictureAsync();
    if (type === Camera.Constants.Type.front) {
      const mirroredPhoto = await manipulateAsync(
        photo.uri,
        [{ flip: FlipType.Horizontal }],
        { compress: 1, format: SaveFormat.PNG }
      );
      setCapturedImage(mirroredPhoto);
    } else {
      const changedPhoto = await manipulateAsync(photo.uri, [], {
        compress: 1,
        format: SaveFormat.PNG,
      });
      setCapturedImage(changedPhoto);
    }

    setPreviewVisible(true);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  const savePicture = async () => {
    const pic = capturedImage;
    await manipulateAsync(
      capturedImage.uri,
      [{ crop: { height: 800, originX: 200, originY: 430, width: 650 } }],
      { compress: 1, format: SaveFormat.PNG }
    );
    setCapturedImage(null);
    setPreviewVisible(false);

    route.params
      ? navigation.navigate("GroupProfile", pic)
      : navigation.navigate("User", pic);
  };

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview
          savePicture={savePicture}
          retakePicture={retakePicture}
          photo={capturedImage}
        />
      ) : (
        <>
          <TopBar
            title
            leftIcon={faArrowLeft}
            color={colors.white}
            onPressLeft={() => navigation.goBack()}
          />
          <Camera
            style={[
              styles.cameraPreview,
              { marginTop: imagePadding, marginBottom: imagePadding },
            ]}
            onCameraReady={setCameraReady}
            ratio={ratio}
            type={type}
            ref={(ref) => {
              setCamera(ref);
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                flex: 1,
                width: "100%",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={takePicture}
                  style={styles.takePictureButton}
                />
                <TouchableOpacity
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.front
                        ? Camera.Constants.Type.back
                        : Camera.Constants.Type.front
                    );
                  }}
                  style={styles.flipCamera}
                >
                  <FontAwesomeIcon
                    icon={faSync}
                    style={styles.icon}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  cameraPreview: {
    flex: 1,
  },
  takePictureButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  flipCamera: {
    position: "absolute",
    right: 0,
    marginTop: "5%",
    marginRight: "10%",
    width: "5%",
    height: "30%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.greenSecondary,
    // marginHorizontal: 25,
  },
});

export default CameraLauncher;
