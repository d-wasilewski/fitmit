import React, { useEffect, useState } from "react";
import GenericCardHolder from "./GenericCardHolder";
import GroupAddModal from "./GroupAddModal";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../redux/actions/groupActions";

const GroupsCard = ({ navigation }) => {
  const { _id: userId } = useSelector((state) => state.user.user);
  const { groupList } = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getGroups(userId));
    }
    setLoaded(true);
  }, [loaded]);

  // useEffect(() => {
  //   // rerender component every time groupList changes (user creates a group)
  //   setLoaded(true);
  // }, [groupList]);

  return (
    <GenericCardHolder title="Groups" cards={groupList} navigation={navigation}>
      <GroupAddModal />
    </GenericCardHolder>
  );
};

export default GroupsCard;
