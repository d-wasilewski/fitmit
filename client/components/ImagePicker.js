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
import * as FileSystem from 'expo-file-system';
import { useDispatch } from "react-redux";
import axios from "axios";

const ImagePicker = () => {
  const { height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));

    navigation.navigate("Home");
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      // console.log(image);

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

        setImage(base64Image);

        axios
          // .put("/61a3d45f9932c823085c1ec7", { userId: "61a3d45f9932c823085c1ec7", profilePicture: image})
          .post("/uploadImage", { userId: "61bb863b74f87664aae7ed7d", profilePicture: base64Image})
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));

        

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
