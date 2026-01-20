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
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => onToggleFavorite && onToggleFavorite(pet.id)}
          activeOpacity={0.8}
    container: {
      backgroundColor: '#D5C0AB',
      borderRadius: 24,
      padding: 24,
      marginHorizontal: 16,
      marginVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
      <TouchableOpacity style={{marginTop: 10, backgroundColor: '#8B6F47', borderRadius: 12, padding: 12, alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16}}>Diário do Pet</Text>
      </TouchableOpacity>
    </View>
  );
};
      </View>

      <Button
        title="Diário do Pet"
        variant="action"
        onPress={() => {
          if (onDiaryPress) {
            onDiaryPress();
          }
        }}
      />
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
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={[styles.image, styles.placeholderContainer]}>
            <Text style={styles.placeholderText}>
              {pet.type === 'cat' ? '🐱' : '🐶'}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pet.name}</Text>
          <Text style={styles.details}>
            {pet.gender} • {pet.age}
          </Text>
        </View>
      </View>
    width: '100%',
    marginBottom: 14,
  },
  image: {
    imageContainer: {
      width: '100%',
      marginBottom: 14,
    },
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
  infoContainer: {
    marginBottom: 14,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Outfit_300Light',
    color: '#2D1810',
    marginBottom: 4,
  },
  details: {
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
    color: '#6B5544',
  },
});

export default Card;
