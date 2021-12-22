import React, { useEffect } from "react";
import {
  Pressable,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import noImg from "../assets/no-img.png";
import * as FileSystem from 'expo-file-system';
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePicture } from "../redux/actions/userActions";

const ImagePicker = () => {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { profilePicture } = useSelector(state => state?.user?.user)

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

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      try {
        const base64Convert = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
        const base64Image = "data:image/png;base64," + base64Convert;

        dispatch(changeProfilePicture("61c251a7804c41d58602f355", base64Image))
      } catch(e) {
        console.log(e);
      }
    }
  };
  return (
    <Pressable
      onPressIn={pickImage}
      style={{
        marginTop: height * 0.12,
        borderRadius: 9999,
      }}
    >
      {profilePicture.url ? (
        <Image style={[styles.profilePicture]} source={{ uri: profilePicture.url }} />
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
});

export default ImagePicker;
