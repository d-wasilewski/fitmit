import React, { useState } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";
import TopBar from "../components/shared/TopBar";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Settings = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <TopBar
        title="Settings"
        color={colors.greenSecondary}
        leftIcon={faArrowLeft}
        position="relative"
        onPressLeft={() => navigation.navigate("Home")}
      />
      <Text style={styles.section}>General</Text>
      <View style={styles.settingsWrapper}>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingText}>Don't log out</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.grey100 }}
            thumbColor={isEnabled ? colors.greenPrimary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingText}>Turn on/off notifications</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: colors.grey100 }}
            thumbColor={isEnabled ? colors.orange : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <Text style={[styles.section, { marginTop: 20 }]}>Security</Text>
      <View style={styles.settingsWrapper}>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingText}>Change password</Text>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={25}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.contact}>
        <Text style={styles.contactText}>Contact us</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  section: {
    color: colors.white,
    fontSize: 22,
    marginTop: "22%",
    marginBottom: 10,
  },
  settingsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.greenTriary,
  },
  settingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontFamily: "Roboto",
  },
  settingText: {
    color: colors.grey100,
    fontSize: 17,
    marginLeft: 7,
  },
  icon: { color: colors.greenSecondary },
  contact: { position: "absolute", bottom: 10 },
  contactText: {
    color: colors.grey200,
  },
});

export default Settings;
