import React from "react";
import { View, Text } from "react-native";
import GenericCardHolder from "./GenericCardHolder";
import GroupAddModal from "./GroupAddModal";

const GroupsCard = () => {
  {
    /* podac dane w postaci cards= ... */
  }
  return (
    <GenericCardHolder
      title="Groups"
      cards={[
        { data: { title: "Dronszki s pyponszem", text: "Damian: JD" } },
        { data: { title: "Dronszkponszem", text: "Miciu: JD" } },
        { data: { title: "Dronszonszem", text: "Damidasan: JD" } },
        { data: { title: "Dronsonszem", text: "Damidsaan: JD" } },
        { data: { title: "Dronszknszem", text: "Damiadsadn: JD" } },
        { data: { title: "Dronszki s pypzem", text: "Damian: JadsdasD" } },
      ]}
    >
      <GroupAddModal />
    </GenericCardHolder>
  );
};

export default GroupsCard;
