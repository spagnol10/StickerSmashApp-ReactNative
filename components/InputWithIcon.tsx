import React from "react";
import { View, TextInput, StyleSheet, Text, useColorScheme } from "react-native";
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
  const theme = useColorScheme(); // Obtém o tema atual (light/dark)

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, theme === "dark" && styles.labelDark]}>{label}</Text>
      <View style={[styles.inputWrapper, theme === "dark" && styles.inputWrapperDark]}>
        <TextInput
          style={[styles.input, theme === "dark" && styles.inputDark]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme === "dark" ? "#888" : "#555"}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
        />
        {value === "" && (
          <Ionicons
            name={iconName}
            size={20}
            color={theme === "dark" ? "white" : "black"}
            style={styles.icon}
          />
        )}
      </View>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputWrapperDark: {
    borderColor: "#444",
    backgroundColor: "#222",
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
