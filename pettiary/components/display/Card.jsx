import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ pet }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[styles.image, styles.placeholderContainer]}>
          <Text style={styles.placeholderText}>
            {pet.type === 'cat' ? '🐱' : '🐶'}
          </Text>
        </View>
      </View>
      
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 14,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
  },
  placeholderContainer: {
    backgroundColor: '#E1D8CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  name: {
    fontSize: 24,
    color: '#2D1810',
  },
});

export default Card;
