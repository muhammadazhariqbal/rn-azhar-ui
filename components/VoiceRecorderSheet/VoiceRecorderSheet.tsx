import React, { useRef, useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  CSSAnimationKeyframes,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Feather, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface VoiceRecorderSheetProps {
  onPress: () => void;
  text: string;
  transcription: string;
  callVoiceListener: () => void;
  stopVoiceListener: () => void;
}

export const VoiceRecorderSheet = ({
  onPress,
  text,
  transcription,
  callVoiceListener,
  stopVoiceListener,
}: VoiceRecorderSheetProps) => {
  const height = useSharedValue(5);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const sheetWidth = screenWidth * 0.95;
  const sheetHeight = screenHeight * 0.25;
  const opacity = useSharedValue(0);
  const handleOpenSheet = () => {
    height.value = withSpring(sheetHeight);
    callVoiceListener();
    handleDisplayContent();
  };
  const handleCloseSheet = () => {
    height.value = withSpring(5);
    stopVoiceListener();
    handleHideContent();
  };
  const handleDisplayContent = () => {
    opacity.value = withSpring(1);
  };
  const handleHideContent = () => {
    opacity.value = withSpring(0);
  };
  const pulse: CSSAnimationKeyframes = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleOpenSheet();
        }}
        style={styles.openSheetButton}
      >
        <Feather name="mic" size={20} color="#fff" />
      </TouchableOpacity>

      <Animated.View
        style={{ ...styles.sheetContainer, width: sheetWidth, height }}
      >
        <ScrollView
          style={{
            height: screenHeight * 0.1,
            marginTop: 5,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.transcripText}>{transcription}</Text>
        </ScrollView>

        <Animated.View
          style={{
            opacity,
            width: screenWidth * 0.4,
            ...styles.animatedSheet,
          }}
        >
          <Animated.View
            style={{
              animationName: pulse,
              ...styles.waveIcon,
            }}
          >
            <MaterialCommunityIcons name="waveform" size={24} color="#fff" />
          </Animated.View>

          <TouchableOpacity
            onPress={() => {
              handleCloseSheet();
            }}
            style={styles.closeSheetButton}
          >
            <Feather name="mic" size={25} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.stopText}>Tap to stop</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  openSheetButton: {
    backgroundColor: "#000",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 3,
    alignSelf: "center",
    margin: 5,
  },
  sheetContainer: {
    backgroundColor: "#0D0D0D",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  transcripText: {
    color: "#fff",
    fontSize: 18,
    margin: 10,
    textAlign: "center",
  },
  waveIcon: {
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in",
    animationDirection: "alternate",
  },
  closeSheetButton: {
    backgroundColor: "#12B2C1",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  stopText: {
    color: "#A2A7B5",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  animatedSheet: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 10,
  },
});
