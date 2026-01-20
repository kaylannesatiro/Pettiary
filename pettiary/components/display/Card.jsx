
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../ui/Button';

const Card = ({ pet, onPress, onDiaryPress, onToggleFavorite }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={[styles.image, styles.placeholderContainer]}>
          <Text style={styles.placeholderText}>
            {pet.type === 'cat' ? '🐱' : '🐶'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(pet.id);
          }}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={pet.isFavorite ? "heart" : "heart-outline"} 
            size={28} 
            color="#D85F7E" 
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.details}>
          {pet.gender} • {pet.age}
        </Text>
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
