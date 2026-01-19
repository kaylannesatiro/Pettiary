import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Card = ({ pet, onToggleFavorite }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[styles.image, styles.placeholderContainer]}>
          <Text style={styles.placeholderText}>
            {pet.type === 'cat' ? '🐱' : '🐶'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite(pet.id)}
        >
          <Ionicons 
            name={pet.isFavorite ? "heart" : "heart-outline"} 
            size={28} 
            color="#D85F7E" 
          />
        </TouchableOpacity>
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
    position: 'relative',
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
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    color: '#2D1810',
  },
});

export default Card;
