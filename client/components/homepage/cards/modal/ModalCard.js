import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../../../styles/colors";
import {
  faCheck,
  faFrog,
  faTimes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

import cardImg from "../../../../assets/miciu.png";

const ModalGenericCard = (props) => {
  const { status } = props;
  let icon, statusColor, iconSize;

  if (status == "pending") {
    icon = faPaperPlane;
    statusColor = colors.orange;
    iconSize = 18;
  } else if (status == "good") {
    icon = faCheck;
    statusColor = colors.greenSecondary;
    iconSize = 20;
  } else if (status == "bad") {
    icon = faTimes;
    statusColor = colors.red;
    iconSize = 20;
  } else {
    icon = faFrog;
    statusColor = colors.grey200;
    iconSize = 20;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Image source={cardImg} style={styles.cardImage} />
        <Text style={styles.cardText}>MiciuPapajciu</Text>
      </View>
      <View style={[styles.statusBox, { backgroundColor: statusColor }]}>
        {icon ? <FontAwesomeIcon icon={icon} size={iconSize} /> : null}
      </View>
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
