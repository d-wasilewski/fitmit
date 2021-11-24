import React, { useState, useEffect } from "react";
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

const ImagePicker = () => {
  const { height } = useWindowDimensions();
  const [image, setImage] = useState(null);

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
      setImage(result.uri);
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
      {image ? (
        <Image style={[styles.profilePicture]} source={{ uri: image }} />
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
    backgroundColor: "green",
    borderRadius: 9999,
  },
});

export default ImagePicker;
