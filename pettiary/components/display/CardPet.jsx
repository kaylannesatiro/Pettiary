import React from 'react';
import { Card, Text, Avatar, IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const PetCard = ({ pet, onPress, onEdit, onDelete }) => {
  const getSpeciesIcon = (species) => {
    const icons = {
      dog: 'dog',
      cat: 'cat',
      bird: 'bird',
      fish: 'fish',
      rabbit: 'rabbit',
    };
    return icons[species] || 'paw';
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years < 1) {
      return `${months} meses`;
    }
    return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  };

  return (
    <Card 
      style={[styles.card, { borderLeftColor: pet.color }]} 
      onPress={onPress}
      mode="elevated"
      elevation={2}
    >
      <Card.Content style={styles.content}>
        <View style={styles.leftSection}>
          {pet.photoUrl ? (
            <Avatar.Image size={64} source={{ uri: pet.photoUrl }} />
          ) : (
            <Avatar.Icon 
              size={64} 
              icon={getSpeciesIcon(pet.species)} 
              style={{ backgroundColor: pet.color }}
            />
          )}
          
          <View style={styles.info}>
            <Text variant="titleLarge" style={styles.name}>
              {pet.name}
            </Text>
            <Text variant="bodyMedium" style={styles.details}>
              {pet.breed} • {calculateAge(pet.birthDate)}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            mode="contained-tonal"
            size={20}
            onPress={() => onEdit && onEdit(pet)}
          />
          <IconButton
            icon="delete"
            mode="contained-tonal"
            size={20}
            iconColor="#B00020"
            onPress={() => onDelete && onDelete(pet)}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default PetCard;
