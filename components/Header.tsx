import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText"; // Certifique-se de importar corretamente
import CustomIcon from "./CustomIcon"; // Certifique-se de importar corretamente

interface HeaderProps {
    userName: string;
    onBackPress: () => void;
    onNotificationsPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onBackPress, onNotificationsPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBackPress}>
                <CustomIcon name="arrow-back-outline" size={24} />
            </TouchableOpacity>

            <ThemedText style={styles.title}>Olá {userName}</ThemedText>

            <TouchableOpacity onPress={onNotificationsPress}>
                <CustomIcon name="notifications-outline" size={24} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default Header;
