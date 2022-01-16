import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import bgImg from "../assets/card-list-orange.png";
import TopBar from "../components/shared/TopBar";
import colors from "../styles/colors";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import HomeMenu from "../components/shared/HomeMenu";
import ImagePicker from "../components/ImagePicker";
import EventSection from "../components/homepage/EventSection";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";

import {
  faCommentDots,
  faUserPlus,
  faBellSlash,
} from "@fortawesome/free-solid-svg-icons";
import MemberCardHolder from "../components/homepage/cards/MemberCardHolder";
import { useSelector, useDispatch } from "react-redux";
import { SET_CURRENT_EVENTS } from "../redux/types";

const GroupProfile = ({ navigation, route }) => {
  const height = Dimensions.get("window").height * 0.03;
  const dispatch = useDispatch();
  const { currentGroup } = useSelector((state) => state.groups);
  const [membersData, setMembersData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    axios
      .put("/group/usersOfTheGroup", {
        members: currentGroup.members,
      })
      .then((res) => setMembersData(res.data));
    axios
      .get(`/group/${currentGroup._id}/events`)
      .then((res) => dispatch({ type: SET_CURRENT_EVENTS, payload: res.data }))
      .catch((err) => console.log(err));
    setEventsData([]);
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", () => {
      dispatch({ type: SET_CURRENT_EVENTS, payload: [] });
    });
  }, [currentGroup]);

  const [isAddMemberModalVisible, setAddMemberModalVisible] = useState(false);

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <ImageBackground source={bgImg} style={styles.headerImage}>
          <TopBar
            title="Group"
            color={colors.blackPrimary}
            leftIcon={faArrowLeft}
            position="relative"
            style={styles.topbar}
            onPressLeft={() => navigation.navigate("Home")}
          />
          <ImagePicker
            style={{ marginTop: 0, borderWidth: 2, borderColor: colors.orange }}
            currentPicture={currentGroup.profilePicture.url}
            navigation={navigation}
            _id={currentGroup._id}
            pictureFromCamera={route.params}
            group
          />
          <View style={styles.groupControlsWrapper}>
            <Text style={[styles.groupName, { marginTop: height }]}>
              {currentGroup.name}
            </Text>
            <View style={styles.quickButtonWrapper}>
              <TouchableOpacity style={[styles.iconWrapper, { marginLeft: 0 }]}>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={styles.icon}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() =>
                  setAddMemberModalVisible(!isAddMemberModalVisible)
                }
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  style={styles.icon}
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <FontAwesomeIcon
                  icon={faBellSlash}
                  style={styles.icon}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.contentWrapper}>
          <EventSection
            altBg
            expandable
            data={eventsData}
            navigation={navigation}
          />
          <MemberCardHolder
            setModalVisible={() =>
              setAddMemberModalVisible(!isAddMemberModalVisible)
            }
            isModalVisible={isAddMemberModalVisible}
            navigation={navigation}
            cards={membersData}
          />
        </View>
      </ScrollView>
      <HomeMenu color={colors.orange} navigation={navigation}></HomeMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPrimary,
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  scrollContainer: {
    flexDirection: "column",
    width: "100%",
    paddingBottom: 80,
  },
  headerImage: {
    width: "100%",
    aspectRatio: 360 / 238,
    flexDirection: "column",
    alignItems: "center",
  },
  topbar: {
    marginBottom: 10,
    position: "relative",
  },
  groupName: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.orange,
    letterSpacing: 1.1,
  },
  contentWrapper: {
    width: "100%",
    marginTop: 200,
  },
  groupControlsWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  quickButtonWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 12,
  },
  iconWrapper: {
    borderRadius: 999,
    backgroundColor: colors.orange,
    padding: 8,
    marginLeft: 20,
  },
  icon: {
    color: colors.blackPrimary,
  },
});

export default GroupProfile;
