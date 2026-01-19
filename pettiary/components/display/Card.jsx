import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ pet }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Text>{pet.gender} • {pet.age}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D5C0AB',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    color: '#2D1810',
  },
});

export default Card;
