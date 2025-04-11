import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, View, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '@/components/CustomIcon';
import { Ionicons } from '@expo/vector-icons';
import InputWithIcon from '@/components/InputWithIcon';

const API_URL = 'http://localhost:8080/users';
const USER_EMAIL = 'theo@gmail.com';

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${API_URL}/${USER_EMAIL}`)
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          avatar: data.avatar || 'https://via.placeholder.com/150',
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar usuário:', error);
        setLoading(false);
      });
  }, []);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  const handleSave = () => {
    fetch(`${API_URL}/${user.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(response => {
        if (response.ok) {
          Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
        } else {
          throw new Error('Erro ao atualizar usuário');
        }
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  const openNotifications = () => {
    // Lógica para abrir notificações
    Alert.alert("Notificações", "Abrindo notificações...");
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) return <ThemedText type="title">Carregando...</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      {/* Header com ícones */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <CustomIcon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <ThemedText>Olá {user.name}</ThemedText>
        <TouchableOpacity onPress={openNotifications}>
          <CustomIcon name="notifications-outline" size={24} />
        </TouchableOpacity>
      </View>



      {/* Avatar */}
      <View style={styles.up}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <Ionicons
          onPress={handleImagePick}
          name="download-outline"
          size={20}
          color="gray" />
      </View>

      {/* Inputs */}
      <InputWithIcon
        label="Nome"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        placeholder="Nome"
        iconName="person-outline"
      />

      <InputWithIcon
        label="Email"
        value={user.email}
        placeholder="E-mail"
        iconName="mail-outline"
        editable={false}
        keyboardType="email-address"
      />

      <InputWithIcon
        label="Phone"
        value={user.phone}
        placeholder="Phone"
        iconName="call-outline"
        editable={false}
        keyboardType="phone-pad"
      />

      <InputWithIcon
        label="Password"
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        placeholder="Senha"
        iconName="lock-closed-outline"
        secureTextEntry
      />

      {/* Botão de Salvar */}
      <CustomButton title="Salvar" onPress={handleSave} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc'
  },
  edit: {
    color: 'white',
    backgroundColor: 'gray',
  },
  up: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
});
