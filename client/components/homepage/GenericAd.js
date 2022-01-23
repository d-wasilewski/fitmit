import React from "react";
import { Dimensions, Image, Pressable, Linking } from "react-native";
import AdImage from "../../assets/reklama.png";

const GenericAd = ({ url, style }) => {
  const SCREEN_WIDTH = Dimensions.get("screen").width;

  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      style={[
        { flex: 1, justifyContent: "flex-start", alignItems: "center" },
        style,
      ]}
    >
      <Image
        source={AdImage}
        style={{
          height: SCREEN_WIDTH / 2,
          width: SCREEN_WIDTH,
          resizeMode: "contain",
        }}
      />
    </Pressable>
  );
};

export default GenericAd;
