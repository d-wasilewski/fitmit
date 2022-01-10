import React, { useEffect, useState } from "react";
import {
  Pressable,
  Image,
  useWindowDimensions,
  StyleSheet,
  Text,
  Button,
  View,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import noImg from "../assets/no-img.png";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePicture } from "../redux/actions/userActions";
import { changeGroupProfilePicture } from "../redux/actions/groupActions";
import colors from "../styles/colors";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const ImagePicker = ({
  pictureFromCamera,
  navigation,
  style,
  currentPicture,
  _id,
  group,
}) => {
  const isFocused = useIsFocused();
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [isCameraOn, setCameraOn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [callUseEffect, setCallUseEffect] = useState(false);
  const [prevCameraPicture, setPrevCameraPicture] = useState("");
  // const [loading, setLoading] = useState(true);
  const { loading } = useSelector((state) => state.user);

  const startCamera = () => {
    setCallUseEffect(!callUseEffect);
    if (hasPermission) {
      // setCameraOn(true);
      navigation.navigate("CameraLauncher", group);
    } else {
      Alert.alert("Premission to camera denied");
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [callUseEffect]);

  useEffect(() => {
    if (isFocused) {
      if (
        pictureFromCamera !== prevCameraPicture &&
        pictureFromCamera !== undefined
      ) {
        setPrevCameraPicture(pictureFromCamera);
        uploadImage(pictureFromCamera.uri);
      }
    }
  }, [isFocused]);

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (photoUri) => {
    try {
      const base64Convert = await FileSystem.readAsStringAsync(photoUri, {
        encoding: "base64",
      });
      const base64Image = "data:image/png;base64," + base64Convert;

      group
        ? dispatch(changeGroupProfilePicture(_id, base64Image))
        : dispatch(changeProfilePicture(_id, base64Image));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable
      onPressIn={toggleModal}
      style={[
        {
          marginTop: height * 0.12,
          borderRadius: 9999,
        },
        style,
      ]}
    >
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={isModalVisible}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard={true}
        style={styles.modal}
      >
        <View style={styles.viewInModal}>
          <TouchableOpacity
            onPress={startCamera}
            style={[styles.buttonTop, styles.buttons]}
          >
            <Text style={{ color: colors.white }}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.buttonBottom, styles.buttons]}
          >
            <Text style={{ color: colors.white }}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={colors.greenSecondary}
            size={69}
          />
        </View>
      ) : currentPicture ? (
        <Image
          style={[styles.profilePicture]}
          source={{ uri: currentPicture }}
        />
      ) : (
        <Image style={[styles.profilePicture]} source={noImg} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 180,
    height: 180,
    backgroundColor: "transparent",
    borderRadius: 9999,
  },
  modal: {
    marginBottom: "70%",
  },
  viewInModal: {
    marginTop: "30%",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  buttons: {
    backgroundColor: colors.blackSecondary,
    justifyContent: "center",
    alignItems: "center",
    height: "17%",
    width: "20%",
    marginLeft: "60%",
  },
  buttonTop: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonBottom: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    marginLeft: "100%",
  },
  loading: {
    backgroundColor: colors.grey200,
    width: 180,
    height: 180,
    borderRadius: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImagePicker;
