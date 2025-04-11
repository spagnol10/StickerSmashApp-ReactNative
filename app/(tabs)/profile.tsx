import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, Alert, Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomButton from '@/components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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

  if (loading) return <ThemedText type="title">Carregando...</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Notificações', 'Você clicou no ícone de notificações!')}>
          <Ionicons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <TouchableOpacity onPress={handleImagePick}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </TouchableOpacity>
      <ThemedText type="subtitle">Clique na foto para alterar</ThemedText>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
        placeholder="Nome"
      />
      <TextInput
        style={styles.input}
        value={user.email}
        editable={false}
        placeholder="E-mail"
      />
      <TextInput
        style={styles.input}
        value={user.phone}
        onChangeText={(text) => setUser({ ...user, phone: text })}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        placeholder="Senha"
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
    top: 50,
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
    marginTop: 10, 
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

