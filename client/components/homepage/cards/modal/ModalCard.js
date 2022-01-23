import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import colors from "../../../../styles/colors";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalGenericCard = (props) => {
  const { data, onChange, displayButton } = props;
  const { status = "bad", username = "" } = data;
  let icon, statusColor, iconSize;

  if (status == "good") {
    icon = faCheck;
    statusColor = colors.greenSecondary;
    iconSize = 20;
  } else if (status == "bad") {
    icon = faTimes;
    statusColor = colors.red;
    iconSize = 20;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {data.profilePicture.url ? (
          <Image
            source={{ uri: data.profilePicture.url }}
            style={styles.cardImage}
          />
        ) : (
          <Image style={styles.cardImage} />
        )}
        <Text style={styles.cardText}>{username}</Text>
      </View>
      {displayButton ? (
        <Pressable
          style={[styles.statusBox, { backgroundColor: statusColor }]}
          onPress={() => onChange(data._id)}
        >
          {icon ? <FontAwesomeIcon icon={icon} size={iconSize} /> : null}
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPrimary,
    width: "100%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statusBox: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 2,
  },
  cardText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: colors.grey200,
    marginLeft: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  cardImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});

export default ModalGenericCard;
