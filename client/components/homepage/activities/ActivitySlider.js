import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import ActivityCard from "./ActivityCard";
import { Accelerometer } from "expo-sensors";

const ActivitySlider = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [prevMagnitude, setPrevMagnitude] = useState(1);
  const [delta, setDelta] = useState(0);
  const [steps, setSteps] = useState(0);
  const [finalSteps, setFinalSteps] = useState(0);
  const [runAdding, setRunAdding] = useState(false);
  const [runInterval, setRunInterval] = useState(false);
  const [time, setTime] = useState(0);
  const [calories, setCalories] = useState(0);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
        const calcMagn = Math.sqrt(
          accelerometerData.x * accelerometerData.x +
            accelerometerData.y * accelerometerData.y +
            accelerometerData.z * accelerometerData.z
        );
        setDelta(Math.abs(prevMagnitude - calcMagn));
        setPrevMagnitude(calcMagn);
      })
    );
  };

  useEffect(() => {
    if (delta > 0.35 && delta < 1.2) {
      setSteps((prevSteps) => prevSteps + 2);
    }
  }, [data]);

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    setCalories(calculateCalories(finalSteps));
  }, [finalSteps]);

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(550);
    return () => _unsubscribe();
  }, []);

  const TIME_MS = 10000;

  useEffect(() => {
    const interval = setInterval(() => {
      setRunAdding(!runAdding);
    }, TIME_MS);

    return () => clearInterval(interval);
  }, [runInterval]);

  useEffect(() => {
    if (steps > 5) {
      setFinalSteps(finalSteps + steps);
      setTime(time + 10);
    } else {
    }

    setSteps(0);
    setRunInterval(!runInterval);
  }, [runAdding]);

  const calculateCalories = (steps) => {
    const MET = 4.3;
    const weight = 70;
    const burned = (
      (((((0.0175 * MET * weight) / 10000) * steps * time) / 60) *
        1000 *
        Math.PI) /
      1000
    ).toFixed(2);

    return burned;
  };

  // Tutaj dane do cardow
  const {
    cards = [
      {
        statistics: [
          { name: "Steps", value: finalSteps, unit: "" },
          {
            name: "Calories",
            value: calories,
            unit: " kcal",
          },
          {
            name: "Time In Action",
            value: (time / 60 / 60).toFixed(0) + ":" + (time / 60).toFixed(0),
            unit: " hr",
          },
        ],
        weekDay: "Today",
        date: "24.10.2021",
      },
      { date: "23.10.2021", weekDay: "Yestarday" },
      { date: "22.10.2021", weekDay: "2 days ago" },
      { date: "21.10.2021", weekDay: "3 days ago" },
      { date: "20.10.2021", weekDay: "4 days ago" },
      { date: "19.10.2021", weekDay: "5 days ago" },
      { date: "18.10.2021", weekDay: "6 days ago" },
    ],
  } = props;
  const colors = [
    "#002C3F",
    "#3F3100",
    "#3F0B00",
    "#01003F",
    "#2B3F00",
    "#2E003F",
    "#003F37",
  ];

  return (
    <ScrollView
      horizontal
      style={[styles.container]}
      showsHorizontalScrollIndicator={false}
    >
      {cards.map((card, index) => {
        return index != cards.length - 1 ? (
          <ActivityCard
            key={card.date}
            gradientColor={colors[index % colors.length]}
            {...cards[index]}
          ></ActivityCard>
        ) : (
          <ActivityCard
            key={card.date}
            style={{ marginRight: windowWidth * 0.05 }}
            gradientColor={colors[index % colors.length]}
            {...cards[index]}
          ></ActivityCard>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    top: "-7%",
  },
});

export default ActivitySlider;
