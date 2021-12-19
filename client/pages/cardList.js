import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";
import bgImg from "../assets/card-list-orange.png";
import TopBar from "../components/shared/TopBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import HomeMenu from "../components/shared/HomeMenu";
import cardImg from "../assets/miciu.png";

const CardList = (props) => {
  const [inputValue, setInputValue] = useState("");

  const {
    navigation,
    cards = [
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "miciu",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "papajciu",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "zydzik",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "wasilus",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "lajtus",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "pypynsz",
      },
      {
        // wczytywanie obrazkow nw jak
        img: cardImg,
        title: "kaciu",
      },
    ],
  } = props;

  const onInputChange = (value) => {
    console.log(inputValue);
    setInputValue(value);
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground source={bgImg} style={styles.headerImage}>
        {/* <Navbar title="Groups"></Navbar> */}
        <TopBar
          title="Groups"
          color={colors.blackPrimary}
          leftIcon={faArrowLeft}
          position="relative"
          style={styles.topbar}
        ></TopBar>
        <View style={styles.inputWrapper}>
          <FontAwesomeIcon icon={faSearch} color={colors.orange} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.grey300}
            style={styles.input}
            value={inputValue}
            onChangeText={onInputChange}
          />
        </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardListWrapper}
      >
        {/* cards */}
        {cards
          .filter((val, index) => {
            return val.title.toLowerCase().includes(inputValue.toLowerCase());
          })
          .map((val, index) => {
            return (
              // ? jako key id grupy/znajomego?
              <View key={val.title} style={styles.card}>
                <Image source={val.img} style={styles.cardImage} />
                <Text style={styles.cardText}>{val.title}</Text>
              </View>
            );
          })}
      </ScrollView>
      <HomeMenu color={colors.orange}></HomeMenu>
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
  inputWrapper: {
    backgroundColor: colors.blackPrimary,
    borderRadius: 999,
    paddingVertical: 15,
    paddingHorizontal: 25,
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    marginLeft: 15,
    color: colors.white,
    width: "100%",
  },
  cardListWrapper: {
    width: "85%",
    flexDirection: "column",
    alignContent: "center",
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.blackSecondary,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontFamily: "RobotoLight",
    fontSize: 19,
    color: colors.white,
    marginLeft: 10,
  },
  cardImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});

export default CardList;
