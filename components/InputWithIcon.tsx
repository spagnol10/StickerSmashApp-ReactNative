import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
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
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
        />
        {value === "" && <Ionicons name={iconName} size={20} color="gray" style={styles.icon} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    marginLeft: 10,
  },
});

export default InputWithIcon;
