import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import api from '../services/api';

const SpotList = props => {
  const { tech, navigation } = props;

  const [spots, setSpots] = useState([]);

  const loadSpots = async () => {
    const response = await api.get('/spots', {
      params: { tech },
    });
    console.log(response.data);
    setSpots(response.data);
  };

  useEffect(() => {
    loadSpots();
  }, []);

  const handleNavigation = id => {
    navigation.navigate('Book', { id });
  };

  const SpotListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        style={styles.thumbnail}
        source={{
          uri:
            /* item.thumbnail */ 'http://agencia.sorocaba.sp.gov.br/wp-content/uploads/2019/05/coworkingpublico022.jpeg',
        }}
      />
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.price}>
        {item.price ? `${item.price}` : 'Gratuito'}
      </Text>
      <TouchableOpacity
        onPress={() => {
          handleNavigation(item._id);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>
      </Text>

      <FlatList
        contentContainerStyle={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <SpotListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
    textTransform: 'capitalize',
  },

  bold: {
    fontWeight: 'bold',
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    paddingRight: 10,
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default withNavigation(SpotList);
