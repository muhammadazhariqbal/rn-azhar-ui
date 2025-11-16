// app/onboarding.tsx

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type InfoItem = {
  id: number;
  subtext: string;
  heading: string;
};

type InfoCarouselProps = {
  items: InfoItem[];
};

export function InfoCarousel({ items }: InfoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const headingColor = "#000";
  const subTextColor = "#98A3C0";
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: GestureResponderEvent) => {
    setTouchStart(e.nativeEvent.pageX);
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    const touchEnd = e.nativeEvent.pageX;

    if (touchStart - touchEnd > 50) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }

    if (touchStart - touchEnd < -50) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleGetStarted = () => {
    console.log("Get Started pressed");
  };

  const handleSkip = () => {
    console.log("Skip pressed");
  };

  const currentSlide = items[currentIndex];

  return (
    <View onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <View style={styles.content}>
        <Text style={{ ...styles.subtext, color: subTextColor }}>
          {currentSlide.subtext}
        </Text>

        <Text style={{ ...styles.heading, color: headingColor }}>
          {currentSlide.heading}
        </Text>

        <View style={styles.dotsContainer}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToSlide(index)}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "red",
  },
  content: {
    width: "100%",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  subtext: {
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 12,
  },
  heading: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 16,
  },
  description: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 48,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: "#000",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  skipButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
  },
  skipButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },
});
