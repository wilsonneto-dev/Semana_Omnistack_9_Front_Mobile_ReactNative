import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import api from '../services/api';

export default function SpotList(props) {
  const { tech } = props;
  const [spots, setSpots] = useState([]);

  const loadSpots = async () => {
    const response = await api.get('/spots', {
      params: { tech },
    });
    console.log(response.data);
    let arr = response.data;
    arr.push(response.data);
    arr.push(response.data);
    arr.push(response.data);
    arr.push(response.data);
    arr.push(response.data);
    setSpots(arr);
  };

  useEffect(() => {
    loadSpots();
  }, []);

  SpotListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image
        style={styles.thumbnail}
        source={{
          uri:
            /* item.thumbnail */ 'https://img.panoramamoveis.com.br/produto/7563/mesa-para-escritorio-angular-me4116-amendoa-tecno-mobili-194709-cape.jpg',
        }}
      />
      <Text>{item.company}</Text>
      <Text>{item.price ? `${item.price}` : 'Gratuito'}</Text>
      <TouchableOpacity>
        <Text>Solicitar Reserva</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Empresas que usam <Text style={styles.bold}>{tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SpotListItem item={item} />}
      />
    </View>
  );
}

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

  listItem: {},

  button: {},

  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 2,
  },
});
