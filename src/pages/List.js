import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [userId, setUserId] = useState('');
  const [techs, setTechs] = useState([]);

  const initialize = async () => {
    const userId = await AsyncStorage.getItem('user');
    const techs = await AsyncStorage.getItem('techs');
    const arrTechs = techs.split(',').map(str => str.trim());

    if (userId) {
      setUserId(userId);
      setTechs(arrTechs);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={logo} />
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
});
