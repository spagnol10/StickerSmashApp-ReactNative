// src/components/QrCodeScanner.tsx

import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType, CameraView } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

interface QrCodeScannerProps {
  visible: boolean;
  onClose: () => void;
  onScanned: (data: string) => void;
}

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({
  visible,
  onClose,
  onScanned,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    onScanned(data);
    onClose(); // Fecha o scanner após escanear
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {hasPermission === null ? (
          <Text>Solicitando permissão da câmera...</Text>
        ) : hasPermission === false ? (
          <Text>Permissão da câmera negada.</Text>
        ) : (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            // type={CameraType.back}
            // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            // barCodeScannerSettings={{
            //   barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            // }}
          >
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  closeButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});