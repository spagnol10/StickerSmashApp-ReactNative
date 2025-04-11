import React, { useRef } from 'react';
import { Animated, Pressable, Text, StyleSheet, useColorScheme } from 'react-native'; 

type ButtonProps = {
  title: string;
  onPress: () => void;
};

function CustomButton({ onPress, title }: ButtonProps) {
  const theme = useColorScheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress(); 
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        style={[styles.button, theme === 'dark' ? styles.buttonDark : styles.buttonLight]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={[styles.text, theme === 'dark' ? styles.textDark : styles.textLight]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  animatedView: {
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonLight: {
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
  },
  buttonDark: {
    backgroundColor: '#4CAF50',
    shadowColor: '#FFF',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLight: {
    color: '#fff',
  },
  textDark: {
    color: '#fff',
  },
});

export default CustomButton;
