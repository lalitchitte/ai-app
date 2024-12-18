import {
  View,
  Text,
  StatusBar,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { onBoardingData } from "@/configs/constants";
import { scale, verticalScale } from "react-native-size-matters";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const BoardingScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const HandleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };

  const handleSkip = async () => {
    const nextIndex = activeIndex + 1;

    if (nextIndex < onBoardingData.length) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      await AsyncStorage.setItem("onboarding", "true");
      router.push("/(routes)/home");
    }
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={["#250152", "#000000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle={"light-content"} />

      <Pressable
        style={{
          position: "absolute",
          top: verticalScale(45),
          right: scale(25),
          flexDirection: "row",
          gap: scale(5),
          alignItems: "center",
          zIndex: 100,
        }}
        onPress={handleSkip}
      >
        <Text
          style={{
            color: "white",
            fontSize: scale(16),
            fontFamily: "Roboto",
            fontWeight: "400",
          }}
        >
          Skip
        </Text>
        <AntDesign name="arrowright" size={scale(18)} color="white"></AntDesign>
      </Pressable>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={HandleScroll}
        ref={scrollViewRef}
      >
        {onBoardingData.map((item: onBoardingDataType, index: number) => (
          <View
            key={index}
            style={{
              width: Dimensions.get("window").width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.image}
            <Text
              style={{
                fontWeight: "500",
                textAlign: "center",
                fontFamily: "Roboto",
                color: "white",
                fontSize: scale(23),
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                paddingTop: verticalScale(10),
                fontWeight: "400",
                textAlign: "center",
                fontFamily: "Roboto",
                color: "#9A9999",
                fontSize: scale(14),
                width: scale(310),
                marginHorizontal: "auto",
              }}
            >
              {item.subtitle}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: verticalScale(50),
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: scale(8),
        }}
      >
        {onBoardingData.map((_, index) => (
          <View
            key={index}
            style={[
              {
                width: scale(8),
                height: scale(8),
                borderRadius: 100,
                backgroundColor: "white",
                marginHorizontal: scale(2),
              },
              { opacity: activeIndex === index ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

export default BoardingScreen;
