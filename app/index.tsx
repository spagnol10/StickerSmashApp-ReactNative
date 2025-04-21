import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";


import { mockUser } from "@/mock/mockUser";

const API_URL = 'http://localhost:8080/users'; 

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/${email}`);
      if (!response.ok) throw new Error("Usuário não encontrado");
  
      const userData = await response.json();
  
      if (userData.password !== password) {
        Alert.alert("Erro", "Senha incorreta");
        return;
      }
  
      Alert.alert("Sucesso", "Login bem-sucedido!");
      router.push("/(tabs)/home"); // Correto com expo-router
  
    } catch (error: any) {
      console.warn("API falhou, usando mock:", error.message);
      router.push("/(tabs)/home"); // Também funciona com mock
  
      if (email === mockUser.email && password === mockUser.password) {
        Alert.alert("Mock", "Login com mock bem-sucedido!");
      } else {
        Alert.alert("Erro", "Email ou senha inválidos.");
      }
    }
  };  

  const handleRegister = () => {
    router.push("/RegisterScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>sign in to access your account</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.optionsRow}>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={20}
            fillColor="#4630EB"
            unFillColor="#FFFFFF"
            text="Remember me"
            iconStyle={{ borderColor: "#4630EB" }}
            textStyle={styles.checkboxLabel}
            isChecked={rememberMe}
            onPress={(checked) => setRememberMe(checked)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerPrompt}>
        Don’t have an account?{" "}
        <Text style={styles.registerLink} onPress={handleRegister}>
          Register now
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  illustration: {
    width: "100%",
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 48,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 4,
    color: "#555",
  },
  forgotPassword: {
    color: "#008066",
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: "#008066",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerPrompt: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
  registerLink: {
    color: "#008066",
    fontWeight: "600",
  },
});
