import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground, Animated, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  const translateX = useRef(new Animated.Value(-20)).current; // Start from -20

  useEffect(() => {
    // Animation for the moving dot (ellipse)
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 20, // Move to the right
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -20, // Move back to the left
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Timer for navigating to main screen after 10 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Navigate to the Main tab navigator
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, [navigation, translateX]);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/474x/d4/6f/fc/d46ffca209d22a4d18a5f64c94b1101d.jpg' }}
      style={styles.background}
    >
      <Text style={styles.title}>Space Explorer</Text>
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.loadingDot, { transform: [{ translateX }] }]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    width: 60,
    height: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  loadingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
