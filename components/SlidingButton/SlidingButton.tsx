import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface SlidingButtonProps {
  onPress: () => void;
  text: string;
}

export const SlidingButton = ({ onPress, text }: SlidingButtonProps) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isDragging, setIsDragging] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.95;
  const circleSize = 70;
  const maxSlideDistance = buttonWidth - circleSize - 10;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsDragging(true);
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(
          0,
          Math.min(gestureState.dx, maxSlideDistance)
        );
        translateX.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        setIsDragging(false);
        if (gestureState.dx >= maxSlideDistance * 0.8) {
          onPress();
          Animated.timing(translateX, {
            toValue: maxSlideDistance,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setTimeout(() => {
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: false,
              }).start();
            }, 300);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <LinearGradient
      colors={["#23717B", "#12B2C1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        {isDragging && (
          <Animated.View
            style={[
              styles.blackTrail,
              {
                width: Animated.add(translateX, 75),
              },
            ]}
          />
        )}

        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.circle, { transform: [{ translateX }] }]}
        >
          <Ionicons name="arrow-forward" size={30} color="#23717B" />
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "95%",
    alignSelf: "center",
    paddingVertical: 5,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  blackTrail: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#000",
    borderRadius: 50,
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    position: "absolute",
    left: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
});
