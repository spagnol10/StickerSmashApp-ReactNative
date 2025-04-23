import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Tipagem da stack
type RootStackParamList = {
  PaymentSuccess: { orderId: string };
  OrderTracking: { orderId: string };
};

type PaymentSuccessScreenRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;
type NavigationProps = StackNavigationProp<RootStackParamList>;

const PaymentSuccessScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<PaymentSuccessScreenRouteProp>();
  const orderId = route.params.orderId;

  return (
    <View style={styles.container}>
      <View style={styles.successBox}>
        <MaterialIcons name="check-circle" size={100} color="white" />
        <View style={styles.qrBox}>
          <QRCode value={`https://meusite.com/pedidos/${orderId}`} size={100} />
        </View>
      </View>

      <Text style={styles.orderText}>Pedido #{orderId}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderTracking', { orderId })}
      >
        <Text style={styles.buttonText}>Acompanhar pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  qrBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});