import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import GenericCardHolder from "./GenericCardHolder";
import GroupAddModal from "./GroupAddModal";
import { useSelector } from "react-redux";
import axios from "axios";

const GroupsCard = () => {
  const { _id: userId } = useSelector((state) => state.user.user);
  const [groupsData, setGroupsData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    await axios
      .get("group/groupsByUserId/61a3ddd918f0eb38b61371ff")
      .then((res) => {
        res.data.forEach((val) => {
          groupsData.push({ data: val });
        });
      });

    setGroupsData(groupsData);
    setLoaded(true);
  }, [userId, loaded]);

  return (
    <GenericCardHolder title="Groups" cards={groupsData}>
      <GroupAddModal />
    </GenericCardHolder>
  );
};

export default GroupsCard;
