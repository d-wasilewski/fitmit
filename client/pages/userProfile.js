import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import colors from "../styles/colors";
import bgImg from "../assets/user_profile_bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Ionicons } from "@expo/vector-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

import ImagePicker from "../components/ImagePicker";
import HomeMenu from "../components/shared/HomeMenu";
import TopBar from "../components/shared/TopBar";
import { SET_CURRENT_USER } from "../redux/types";
import InterestsList from "../components/homepage/user_profile/InterestsList";
import InterestModal from "../components/homepage/user_profile/modal/InterestModal";
import DescriptionModal from "../components/homepage/user_profile/modal/DescriptionModal";

const User = ({ navigation, route }) => {
  const { height } = useWindowDimensions();
  // logged in user
  const { username, desc, _id, profilePicture } = useSelector(
    (state) => state?.user?.user
  );
  // profile of the user whose page is being viewed
  const { currentUser } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const { premium = "error", interests: userInterests } = useSelector(
    (state) => state?.user?.user
  );

  const [interestModalVisible, setInterestModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

  const [interests, setInterests] = useState([
    { name: "Food 🍔", selected: false },
    { name: "Mobilki 📱", selected: false },
    { name: "Football 🗑", selected: false },
    { name: "Basketball 🏀", selected: false },
    { name: "Pipong 🏓", selected: false },
    { name: "Volleyball 🏐", selected: false },
    { name: "Calisthenics 🦍", selected: false },
  ]);

  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      dispatch({ type: SET_CURRENT_USER, payload: null });
    });
    const user_interests =
      currentUser != null ? currentUser.interests : userInterests;

    const updatedInterests = JSON.parse(JSON.stringify(interests));
    updatedInterests.forEach((val) =>
      user_interests.some((int) => val.name == int)
        ? (val.selected = true)
        : null
    );
    setInterests(updatedInterests);
  }, [currentUser]);

  function getPremiumStyle() {
    return premium
      ? {
          color: colors.greenSecondary,
          fontFamily: "ComfortaaBold",
          marginRight: 30,
        }
      : {};
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={bgImg}
        resizeMode="cover"
        style={[styles.image, { height: height * 0.3 }]}
      >
        {currentUser ? (
          <ImagePicker
            style={{ borderWidth: 2, borderColor: colors.greenSecondary }}
            navigation={navigation}
            pictureFromCamera={route.params}
            currentPicture={currentUser.profilePicture.url}
            _id={currentUser._id}
          />
        ) : (
          <ImagePicker
            style={{ borderWidth: 2, borderColor: colors.greenSecondary }}
            navigation={navigation}
            pictureFromCamera={route.params}
            currentPicture={profilePicture.url}
            _id={_id}
          />
        )}
      </ImageBackground>
      <TopBar
        title
        leftIcon={faArrowLeft}
        rightIcon={<Ionicons name="settings-sharp" size={25} color="black" />}
        color={colors.blackPrimary}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.navigate("Settings")}
      />

      <Text style={[styles.name, getPremiumStyle()]}>
        <Text style={{ fontSize: 32 }}>{premium ? "😎" : ""}</Text>
        {currentUser ? currentUser.username : username}
      </Text>
      <View style={styles.aboutMe}>
        <Text style={styles.aboutMeText}>About me</Text>
        {currentUser && currentUser._id != _id ? null : (
          <TouchableOpacity onPress={() => setDescriptionModalVisible(true)}>
            <FontAwesomeIcon icon={faPen} style={styles.icon} size={20} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.desc}>
        {currentUser && currentUser.desc
          ? currentUser.desc
          : desc
          ? desc
          : "No personal info"}
      </Text>
      <InterestsList
        title={"Interests"}
        onPress={() => setInterestModalVisible(true)}
        data={interests}
      />
      <InterestModal
        visible={interestModalVisible}
        title="Interests"
        closeModal={() => setInterestModalVisible(false)}
        data={interests}
        onChange={(arr) => setInterests(arr)}
        user={currentUser ? currentUser._id : _id}
      />
      <DescriptionModal
        visible={descriptionModalVisible}
        title="About Me"
        closeModal={() => setDescriptionModalVisible(false)}
        data={desc}
        user={currentUser ? currentUser._id : _id}
      />
      <HomeMenu navigation={navigation} />
    </View>
  );
};

// TODO: Zmienić czcionki
const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    left: "7%",
    top: 40,
  },
  iconTop: {
    color: colors.blackPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blackPrimary,
  },
  image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 180,
    height: 180,
    backgroundColor: "green",
    borderRadius: 9999,
  },
  name: {
    fontSize: 40,
    color: colors.white,
    textAlign: "center",
    marginTop: 60,
    fontFamily: "ComfortaaRegular",
  },
  desc: {
    color: colors.white,
    marginHorizontal: "7%",
    marginTop: 10,
  },
  aboutMe: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  aboutMeText: {
    color: colors.white,
    marginLeft: "7%",
    marginRight: 10,
    fontSize: 22,
    fontFamily: "RobotoBold",
  },
  icon: {
    color: colors.greenSecondary,
  },
  loading: {
    height: 300,
    width: 300,
    top: 200,
  },
});

export default User;
