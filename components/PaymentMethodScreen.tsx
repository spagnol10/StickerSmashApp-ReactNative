// import { useState } from "react";
// import { View, TouchableOpacity, Modal, Text } from "react-native";

// const PaymentMethodScreen = () => {
//     const [showCardTypeModal, setShowCardTypeModal] = useState(false);
  
//     return (
//       <View style={styles.container}>
//         {/* Botão que abre o modal */}
//         <TouchableOpacity onPress={() => setShowCardTypeModal(true)}>
//           <Text style={styles.addCardText}>Adicionar Cartão</Text>
//         </TouchableOpacity>
  
//         {/* Coloque o Modal AQUI dentro do return */}
//         <Modal
//           visible={showCardTypeModal}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setShowCardTypeModal(false)}
//         >
//           <View style={styles.modalBackground}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Escolha um meio de pagamento</Text>
  
//               {["Crédito", "Débito", "Vale-refeição", "Vale-alimentação"].map((type) => (
//                 <TouchableOpacity
//                   key={type}
//                   style={styles.cardTypeButton}
//                   onPress={() => {
//                     // Fechar modal e seguir para próxima ação
//                     setShowCardTypeModal(false);
//                     if (type === "Crédito") {
//                       // Por exemplo: ir para tela de inserir cartão
//                       navigation.navigate("InsertCardScreen");
//                     }
//                   }}
//                 >
//                   <Text style={styles.cardTypeText}>{type}</Text>
//                 </TouchableOpacity>
//               ))}
  
//               <TouchableOpacity onPress={() => setShowCardTypeModal(false)}>
//                 <Text style={styles.cancelText}>Cancelar</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     );
//   };

//   import { StyleSheet } from 'react-native';

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff', // ou sua cor de fundo
//     padding: 16,
//   },
//   addCardText: {
//     fontSize: 16,
//     color: '#D72638', // ou a cor primária da sua marca
//     textAlign: 'center',
//     paddingVertical: 12,
//     borderWidth: 1,
//     borderColor: '#D72638',
//     borderRadius: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     justifyContent: 'flex-end',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 24,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   cardTypeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     backgroundColor: '#f7f7f7',
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   cardTypeText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   cancelText: {
//     fontSize: 16,
//     color: '#D72638',
//     textAlign: 'center',
//     marginTop: 16,
//   },
// });