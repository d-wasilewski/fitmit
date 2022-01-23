import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import colors from "../../../styles/colors";
import ModalGenericCard from "./modal/ModalCard";
import ModalSearch from "./modal/ModalSearch";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  addMemberToGroup,
  populateMembers,
} from "../../../redux/actions/groupActions";

const MemberAddModal = (props) => {
  const { visible, title, onQuit } = props;
  const marginSize = Dimensions.get("screen").height * 0.08;
  const buttonTopMargin = marginSize * 0.3;
  const dispatch = useDispatch();

  const { currentGroup } = useSelector((state) => state.groups);
  const [users, setUsers] = useState([]);
  const [oldUsers, setOldUsers] = useState([]);

  useEffect(async () => {
    const { data: fetched_group_users } = await axios.put(
      "/group/usersOfTheGroup",
      {
        members: currentGroup.members,
      }
    );
    const res = await axios.get("/");
    const filtered_users = res.data.filter((val) => {
      return !fetched_group_users.some((user) => user._id == val._id);
    });
    const mapped_users = filtered_users.map((val) =>
      Object.assign({}, val, { status: "bad" })
    );
    const group_users = fetched_group_users.map((val) =>
      Object.assign({}, val, { status: "good" })
    );
    // console.log(filtered_users);
    const concated = group_users.concat(mapped_users);
    setUsers(concated);
    setOldUsers(JSON.parse(JSON.stringify(concated)));
  }, []);

  function changeStatus(id) {
    const modified_users = users.map((val) => {
      if (val._id == id) {
        if (val.status == "bad") val.status = "good";
        else val.status = "bad";
        return val;
      }
      return val;
    });
    setUsers(modified_users);
  }

  async function accept() {
    const changed_users = users.filter((val) => {
      return oldUsers.some(
        (oldVal) => oldVal._id == val._id && oldVal.status != val.status
      );
    });

    changed_users.map((val) => {
      console.log("VAL", val.status);
      if (val.status == "good") {
        console.log("GOOD");
        dispatch(addMemberToGroup(currentGroup, val._id));
      } else {
        console.log("BAD");
        axios.delete(`/group/${currentGroup._id}/${val._id}`);
      }
    });

    try {
      // console.log(requests.length);
      // await Promise.all(requests);
    } catch (error) {
      console.log(error);
      const stringify = JSON.stringify(oldUsers);
      const copy_old_users = JSON.parse(stringify);
      setUsers(copy_old_users);
    }
  }

  function cancel() {
    const stringify = JSON.stringify(oldUsers);
    const copy_old_users = JSON.parse(stringify);
    setUsers(copy_old_users);
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={[styles.content, { marginTop: marginSize }]}>
          <View style={styles.headerWrapper}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <View style={styles.contentWrapper}>
            <ModalSearch />
            <ScrollView
              style={styles.cardsWrapper}
              showsVerticalScrollIndicator={false}
            >
              {users.map((val) => (
                <ModalGenericCard
                  key={val._id}
                  data={val}
                  onChange={(id) => changeStatus(id)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={[styles.buttonsWrapper, { marginTop: buttonTopMargin }]}>
            <Pressable
              onPress={() => {
                onQuit();
                cancel();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.red,
                  borderBottomColor: colors.darkRed,
                },
              ]}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
            <Pressable
              on
              onPress={() => {
                onQuit();
                accept();
              }}
              style={[
                styles.button,
                {
                  backgroundColor: colors.greenSecondary,
                  borderBottomColor: colors.greenTriary,
                },
              ]}
            >
              <Text style={styles.buttonText}>ACCEPT</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    backgroundColor: colors.blackSecondary,
    width: "88%",
    height: "80%",
    borderRadius: 20,
    overflow: "visible",
    alignItems: "center",
  },
  text: {
    fontFamily: "ComfortaaBold",
    fontSize: 24,
    color: colors.blackPrimary,
    textAlign: "center",
  },
  headerWrapper: {
    backgroundColor: colors.orange,
    paddingVertical: 17,
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  contentWrapper: {
    width: "90%",
    height: "75%",
    alignItems: "center",
    paddingTop: 20,
  },
  cardsWrapper: {
    marginTop: 20,
    width: "100%",
  },
  buttonsWrapper: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 25,
    backgroundColor: "blue",
    borderRadius: 5,
    borderBottomWidth: 3,
  },
  buttonText: {
    fontFamily: "RobotoBold",
    fontSize: 18,
    color: colors.white,
  },
});

export default MemberAddModal;
