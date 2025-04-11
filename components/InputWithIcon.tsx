import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface InputWithIconProps {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  iconName: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  secureTextEntry = false,
  editable = true,
  keyboardType = "default",
}) => {
  const theme = useColorScheme();
  const [isFocused, setIsFocused] = useState(false);

  // Animação para transição suave de cor ao mudar o tema
  const backgroundColorAnim = useRef(new Animated.Value(theme === "dark" ? 1 : 0)).current;
  const borderColorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: theme === "dark" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const animatedBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#222"], // Claro para escuro
  });

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#4CAF50"], // Cinza para verde ao focar
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, theme === "dark" && styles.labelDark]}>{label}</Text>
      <Animated.View
        style={[
          styles.inputWrapper,
          { backgroundColor: animatedBackgroundColor, borderColor: animatedBorderColor },
        ]}
      >
        <TextInput
          style={[styles.input, theme === "dark" && styles.inputDark]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme === "dark" ? "#fff" : "#555"}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
          onFocus={() => {
            setIsFocused(true);
            Animated.timing(borderColorAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }}
          onBlur={() => {
            setIsFocused(false);
            Animated.timing(borderColorAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }}
        />
        {value === "" && (
          <Ionicons
            name={iconName}
            size={20}
            color={theme === "dark" ? "white" : "black"}
            style={styles.icon}
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  labelDark: {
    color: "white",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "black",
  },
  inputDark: {
    color: "white",
  },
  icon: {
    marginLeft: 10,
  },
});

export default InputWithIcon;
