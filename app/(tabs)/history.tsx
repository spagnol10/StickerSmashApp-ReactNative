import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ordersData = [
  {
    id: "1",
    date: "Qua. 21 Agosto 2024",
    store: "Nome do lugar - 01",
    orderNumber: "2367",
    items: [
      { name: "Banana", quantity: 1 },
      { name: "Banana Caturra", quantity: 4 },
    ],
  },
  {
    id: "2",
    date: "Qua. 21 Agosto 2024",
    store: "Nome do lugar - 02",
    orderNumber: "2366",
    items: [
      { name: "Banana Caturra", quantity: 4 },
      { name: "Banana Maçã", quantity: 2 },
      { name: "Tomate", quantity: 1 },
      { name: "Banana", quantity: 1 },
      { name: "Banana", quantity: 1 },
    ],
  },
];

export default function OrdersHistoryScreen() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const renderOrderCard = (order: any) => {
    const isExpanded = expandedOrder === order.id;
    const itemsToShow = isExpanded ? order.items : [order.items[0]];

    return (
      <View key={order.id} style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.icon}
          />
          <View>
            <Text style={styles.store}>{order.store}</Text>
            <View style={styles.statusRow}>
              <MaterialIcons name="check-box" color="green" size={18} />
              <Text style={styles.status}>Pedido Concluido - {order.orderNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.itemsList}>
          {itemsToShow.map((item: any, index: number) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemText}>
                {item.quantity} {item.name}
              </Text>
              <Text style={styles.emoji}>🍌</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => toggleExpand(order.id)} style={styles.expandButton}>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={18}
            color="#666"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        {/* <Text style={styles.headerTitle}>My orders</Text> */}
        <View style={{ width: 24 }} /> {/* Placeholder para centralizar o título */}
      </View>

      {/* <Text style={styles.dateText}>Qua. 21 Agosto 2024</Text> */}

      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderOrderCard(item)}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#444" />
        <Ionicons name="cart-outline" size={24} color="#444" />
        <Ionicons name="bar-chart-outline" size={24} color="#008066" />
        <Ionicons name="person-outline" size={24} color="#444" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  store: {
    fontWeight: "600",
    fontSize: 16,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  status: {
    marginLeft: 6,
    fontSize: 13,
    color: "#555",
  },
  itemsList: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  itemText: {
    fontSize: 14,
    color: "#444",
  },
  emoji: {
    fontSize: 16,
  },
  expandButton: {
    alignItems: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
