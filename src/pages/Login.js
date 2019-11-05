import React, { useState, useEffect } from 'react';

import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import imageLogo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  const [tecnologias, setTecnologias] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(userId => {
      if (userId) {
        navigation.navigate('List');
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post('sessions', {
      user,
    });

    const { _id } = response.data.user;

    storeData = async () => {
      try {
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', tecnologias);
        console.log('gravou');
      } catch (e) {
        console.log('deu ruim', e);
      }
    };

    await storeData();

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      style={styles.container}>
      <Image source={imageLogo} />

      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={user}
          onChangeText={setUser}
        />

        <Text style={styles.label}>TECNOLOGIAS</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={tecnologias}
          onChangeText={setTecnologias}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
