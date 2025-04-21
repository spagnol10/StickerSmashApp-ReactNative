import { mockRegister } from "@/mock/auth/mockAuthService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import HomeScreen from "./(tabs)/home";
import { useRouter } from "expo-router";

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
};

export default function RegisterScreen() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Validation", "Please fill in all fields.");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Validation", "You must agree to the Terms and Conditions.");
      return;
    }

    try {
      setLoading(true);
      const response = await mockRegister({ fullName, email, phone, password });
      Alert.alert("Success", response.message, [
        {
          text: "OK",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.title}>Registre-se</Text>
      <Text style={styles.subtitle}>Crie sua conta grátis.</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Email válido"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Numero de telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#888" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.checkboxRow}>
        <BouncyCheckbox
          size={18}
          fillColor="#008066"
          unFillColor="#FFF"
          iconStyle={{ borderColor: "#008066" }}
          isChecked={agreeTerms}
          onPress={(checked: boolean) => setAgreeTerms(checked)}
        />
        <Text style={styles.termsText}>
          Ao marcar a caixa, você concorda com nossos{" "}
          <Text style={styles.termsLink}>Termos e Conditicões</Text>.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.registerButton, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.registerText}>Registre-se</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.loginPrompt}>
        Já é membro? <Text style={styles.loginLink} onPress={ () => router.push("/home")}>Log In</Text>
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
    fontSize: 28,
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
    marginBottom: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#444",
  },
  termsLink: {
    color: "#008066",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#008066",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginPrompt: {
    textAlign: "center",
    color: "#333",
    fontSize: 14,
  },
  loginLink: {
    color: "#008066",
    fontWeight: "600",
  },
});
