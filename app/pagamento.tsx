import { Camera, CameraCapturedPicture } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { QrCodeScanner } from "@/components/QrCodeScanner";
import { Modal } from "react-native";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
    const [selectedDelivery, setSelectedDelivery] = useState<"standard" | "fast">("standard");
    const [selectedPayment, setSelectedPayment] = useState<"pix" | "card" | null>("pix");
    const [showCardTypeModal, setShowCardTypeModal] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef<CameraCapturedPicture | null>(null);

    const [showScanner, setShowScanner] = useState(false);

    const router = useRouter();

    const handleQrScanned = (data: string) => {
        Alert.alert("Código Pix escaneado!", data);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        setShowScanner(false);
        Alert.alert("Código Pix escaneado", data);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Finalize seu pedido</Text>

            <View style={styles.tabContainer}>
                <Text style={[styles.tab, styles.activeTab]}>Entrega</Text>
                <Text style={styles.tab}>Retirada</Text>
            </View>

            <View style={styles.addressContainer}>
                <Text style={styles.address}>R. Salgado Filho, 590{"\n"}apartamento 2 - Cascavel/PR</Text>
                <TouchableOpacity>
                    <Text style={styles.change}>Trocar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Hoje, 24-34 min</Text>

            <View style={styles.deliveryOptions}>
                <TouchableOpacity
                    style={[
                        styles.deliveryBox,
                        selectedDelivery === "standard" && styles.selectedBox,
                    ]}
                    onPress={() => setSelectedDelivery("standard")}
                >
                    <Text style={styles.deliveryType}>Padrão</Text>
                    <Text style={styles.deliveryTime}>Hoje, 24–34 min</Text>
                    <Text style={styles.deliveryPrice}>R$ 2,99</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.deliveryBox,
                        selectedDelivery === "fast" && styles.selectedBox,
                    ]}
                    onPress={() => setSelectedDelivery("fast")}
                >
                    <Text style={styles.deliveryType}>Rápida</Text>
                    <Text style={styles.deliveryTime}>Hoje, 19–29 min</Text>
                    <Text style={styles.deliveryPrice}>R$ 9,99</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.paymentTabContainer}>
                <Text style={[styles.paymentTab, styles.activeTab]}>Pague pelo site</Text>
                <Text style={styles.paymentTab}>Pague na entrega</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.paymentOption,
                    selectedPayment === "pix" && styles.selectedBox,
                ]}
                onPress={() => setSelectedPayment("pix")}
            >
                <Text style={styles.paymentLabel}>Pague com Pix</Text>
                <Text style={styles.paymentDesc}>Use o QR Code ou copie e cole o código</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.paymentOption,
                    selectedPayment === "card" && styles.selectedBox,
                ]}
                onPress={() => setSelectedPayment("card")}
            >
                <Image
                    source={require("../assets/images/logo.png")} // substitua com a imagem correta
                    style={styles.cardImage}
                />
                <Text style={styles.paymentLabel}>Adicione um cartão</Text>
                <Text style={styles.paymentDesc}>
                    É prático, seguro e você não perde tempo quando seu pedido chegar.
                </Text>
                <TouchableOpacity style={styles.cardButton} onPress={() => setShowCardTypeModal(true)}>
                    <Text style={styles.cardButtonText}>Adicionar novo cartão</Text>
                </TouchableOpacity>
                <Modal
                    visible={showCardTypeModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowCardTypeModal(false)}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Escolha um meio de pagamento</Text>

                            {["Crédito", "Débito", "Vale-refeição", "Vale-alimentação"].map((type) => (
                                <TouchableOpacity key={type} style={styles.cardTypeButton}>
                                    <Text style={styles.cardTypeText}>{type}</Text>
                                </TouchableOpacity>
                            ))}

                            <TouchableOpacity onPress={() => setShowCardTypeModal(false)}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => setShowScanner(true)}
            >
                <Text style={styles.paymentButtonText}>Realizar pagamento</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.finishPayment}
                onPress={() => router.push("/VendaRealizadaScreen")}
            >
                <Text style={styles.paymentButtonText}>Realizar pagamento</Text>
            </TouchableOpacity>

            <QrCodeScanner
                visible={showScanner}
                onClose={() => setShowScanner(false)}
                onScanned={handleQrScanned}
            />

            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    tab: {
        fontSize: 16,
        color: "#999",
        marginRight: 20,
    },
    activeTab: {
        color: "#00D361",
        fontWeight: "bold",
    },
    addressContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    address: {
        fontSize: 16,
        color: "#333",
    },
    change: {
        color: "#00D361",
        fontWeight: "bold",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    deliveryOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
    },
    deliveryBox: {
        width: "48%",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    selectedBox: {
        borderColor: "#00D361",
        backgroundColor: "#eafff2",
    },
    deliveryType: {
        fontWeight: "bold",
        color: "#333",
    },
    deliveryTime: {
        color: "#666",
        fontSize: 14,
    },
    deliveryPrice: {
        fontWeight: "bold",
        color: "#333",
        marginTop: 5,
    },
    paymentTabContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    paymentTab: {
        fontSize: 16,
        color: "#999",
        marginRight: 20,
    },
    paymentOption: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#333",
    },
    paymentDesc: {
        fontSize: 14,
        color: "#666",
    },
    cardImage: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginBottom: 10,
    },
    cardButton: {
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#00D361",
        alignItems: "center",
    },
    cardButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    cardTypeButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        marginBottom: 10,
    },
    cardTypeText: {
        fontSize: 16,
        color: "#333",
    },
    cancelText: {
        color: "#00D361",
        fontWeight: "bold",
        marginTop: 15,
    },
    paymentButton: {
        backgroundColor: "#00D361",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 30,
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    closeScannerButton: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    closeScannerText: {
        color: "#00D361",
        fontWeight: "bold",
    },
    finishPayment: {
        backgroundColor: "#00D361",
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 30,
    },
});
