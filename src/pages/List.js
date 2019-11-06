import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

export default function List() {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    setUserId('10');
  }, []);

  return (
    <View>
      <Text>- {userId} -</Text>
    </View>
  );
}
