import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [onBoarding, setOnBoarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnBoarding = async () => {
      const isOnBoarding = await AsyncStorage.getItem("onboarding");
      if (isOnBoarding) {
        setOnBoarding(false);
      }
      setLoading(false);
    };
    checkOnBoarding();
  }, []);

  if (loading) return null;

  return (
    <Redirect href={onBoarding ? "/(routes)/onBoarding" : "/(routes)/home"} />
  );
};

export default index;
