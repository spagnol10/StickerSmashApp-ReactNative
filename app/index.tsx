import React, { useEffect, useState } from "react";
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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://localhost:8080/users';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadRememberedEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("rememberedEmail");
      if (storedEmail) {
        setEmail(storedEmail);
        setRememberMe(true);
      }
    };
    loadRememberedEmail();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/${email}`);
      if (!response.ok) throw new Error("Usuário não encontrado");

      const userData = await response.json();

      if (userData.password !== password) {
        Alert.alert("Erro", "Senha incorreta");
        return;
      }

      // Salvar ou remover e-mail com base no checkbox
      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      Alert.alert("Sucesso", "Login bem-sucedido!");
      router.push("/(tabs)/home");
    } catch (error: any) {
      console.warn("API falhou:", error.message);
      router.push("/(tabs)/home");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Recuperação de senha", "Função de recuperação ainda não implementada.");
    // router.push("/ForgotPasswordScreen") se tiver uma tela
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

      <Text style={styles.title}>Bem-vindo de volta</Text>
      <Text style={styles.subtitle}>Faça login para acessar sua conta</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.optionsRow}>
        <View style={styles.checkboxContainer}>
    Colocar checkbox para lembrar senha
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.registerPrompt}>
        Não tem uma conta?{" "}
        <Text style={styles.registerLink} onPress={handleRegister}>
          Cadastre-se agora
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
