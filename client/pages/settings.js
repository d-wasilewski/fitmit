import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text, Alert } from "react-native";
import TopBar from "../components/shared/TopBar";
import colors from "../styles/colors";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Button from "../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../redux/actions/userActions";

const Settings = ({ navigation }) => {
  const { dontLogout, notificationsOn } = useSelector(
    (state) => state.user.user.settings
  );
  const { _id: userId } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isLogoutEnabled, setIsLogoutEnabled] = useState(dontLogout);
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    useState(notificationsOn);
  const [showButton, setShowButton] = useState(false);

  const toggleLogoutSwitch = () => {
    setIsLogoutEnabled((previousState) => !previousState);
  };

  const toggleNotificationsSwitch = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    setShowButton(
      isNotificationsEnabled != notificationsOn || isLogoutEnabled != dontLogout
    );
  }, [isNotificationsEnabled, notificationsOn, isLogoutEnabled, dontLogout]);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (!showButton ) {
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation, showButton]);

  const handleSave = () => {
    setShowButton(false);

    dispatch(
      updateUserData(userId, {
        userId,
        settings: {
          dontLogout: isLogoutEnabled,
          notificationsOn: isNotificationsEnabled,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="Settings"
        color={colors.greenSecondary}
        leftIcon={faArrowLeft}
        position="relative"
        onPressLeft={() => navigation.goBack()}
      />
      <Text style={styles.section}>General</Text>
      <View style={styles.settingsWrapper}>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingText}>Don't log out</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.grey100 }}
            thumbColor={isLogoutEnabled ? colors.greenPrimary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLogoutSwitch}
            value={isLogoutEnabled}
          />
        </View>
        <View style={styles.settingWrapper}>
          <Text style={styles.settingText}>Turn on/off notifications</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: colors.grey100 }}
            thumbColor={isNotificationsEnabled ? colors.orange : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotificationsSwitch}
            value={isNotificationsEnabled}
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
      {showButton ? (
        <View style={styles.button}>
          <Button title="Save changes" onPress={handleSave} />
        </View>
      ) : null}
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
  button: {
    marginTop: 25,
    height: 33,
    width: "45%",
  },
});

export default Settings;
