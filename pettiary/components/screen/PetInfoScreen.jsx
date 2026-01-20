import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { usePets } from '../contexts/Pets.Context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PetHeader from '../ui/PetHeader';
import InfoTag from '../ui/InfoTag';
import Button from '../ui/Button';

const PetInfoScreen = ({ 
  petId,
  onBack,
  onEdit,
  onOpenDiary,
}) => {
  const insets = useSafeAreaInsets();
  const { getPetById, toggleFavorite } = usePets();
  const pet = getPetById(petId);
  if (!pet) return null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}> 
      <PetHeader 
        petName={pet.name} 
        onBack={onBack}
        rightIcon="create-outline"
        onRightIconPress={onEdit}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {pet.image ? (
            <Image 
              source={pet.image}
              style={styles.petImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                {pet.type === 'cat' ? '🐱' : '🐶'}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.petName}>{pet.name}</Text>
            <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(pet.id)}>
              <Ionicons name={pet.isFavorite ? 'heart' : 'heart-outline'} size={28} color="#A0744F" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Informações Gerais do Pet</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <InfoTag text={pet.gender} style={styles.infoTag} />
              <View style={styles.tagSpacer} />
              <InfoTag text={pet.age} style={styles.infoTag} />
            </View>
            <View style={styles.infoRow}>
              <InfoTag text={pet.weight} style={styles.infoTag} />
              <View style={styles.tagSpacer} />
              <InfoTag text={pet.breed} style={styles.infoTag} />
            </View>
          </View>

          <Button 
            title="Diário do Pet"
            onPress={onOpenDiary}
            variant="primary"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#D5C0AB',
  },
  petImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1D8CF',
  },
  placeholderText: {
    fontSize: 120,
  },
  contentContainer: {
    backgroundColor: '#E1D8CF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  petName: {
    fontSize: 32,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
  },
  heartButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
    marginBottom: 20,
  },
  infoGrid: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoTag: {
    flex: 1,
  },
  tagSpacer: {
    width: 12,
  },
});

export default PetInfoScreen;
