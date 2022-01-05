import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import GenericCardHolder from "./GenericCardHolder";
import GroupAddModal from "./GroupAddModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getGroups } from "../../../redux/actions/groupActions";

const GroupsCard = () => {
  const { _id: userId } = useSelector((state) => state.user.user);
  const { groupList } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const [groupsData, setGroupsData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    if (userId) {
      dispatch(getGroups(userId));
    }
    setGroupsData(groupList);
    setLoaded(true);
  }, [loaded]);

  return (
    <GenericCardHolder title="Groups" cards={groupsData}>
      <GroupAddModal />
    </GenericCardHolder>
  );
};

export default GroupsCard;
