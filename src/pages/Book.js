import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import logo from '../assets/logo.png';

const Book = ({ navigation }) => {
  const [spotId, setSpotId] = useState(0);
  const [date, setDate] = useState('');

  useEffect(() => {
    const id = navigation.getParam('id');
    setSpotId(id);
  }, []);

  async function handleSubmit() {
    const userId = await AsyncStorage.getItem('user');
    const response = await api.post(
      `/spots/${spotId}/bookings`,
      { date },
      { headers: { user_id: userId } },
    );

    console.log(response.data);

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }
  function handleCancel() {
    navigation.navigate('List');
  }

  return (
    <SafeAreaView>
      <Image style={styles.logo} source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Qual data quer reservar?</Text>
        <TextInput
          style={styles.input}
          placeholder="Qual a data"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={date}
          onChangeText={setDate}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, styles.buttonCancel]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
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

  buttonCancel: {
    marginTop: 5,
    backgroundColor: '#ccc',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Book;
