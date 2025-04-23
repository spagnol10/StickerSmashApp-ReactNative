import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const InsertCardScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crédito</Text>

      <View style={styles.cardMock}>
        <Text style={styles.cardType}>💳 Crédito</Text>
        <Text style={styles.cardNumber}>0000 0000 0000 0000</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>Nome impresso no cartão</Text>
          <Text style={styles.cardLabel}>MM/AA</Text>
        </View>
      </View>

      <Text style={styles.infoText}>
        Faremos uma pequena cobrança com devolução automática.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Número do cartão"
        keyboardType="numeric"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.buttonDisabled} disabled>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InsertCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#d6001c", // Sua cor primária (vermelho do botão)
  },
  cardMock: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardType: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 10,
    color: "#000",
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#999",
    fontWeight: "bold",
    fontSize: 16,
  },
});