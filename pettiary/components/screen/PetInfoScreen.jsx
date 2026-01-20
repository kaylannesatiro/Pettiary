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

// Função para formatar idade do pet
function formatAge(age) {
  if (!age) return 'Não informado';
  if (typeof age === 'string') return age;
  if (typeof age === 'number') return `${age} anos`;
  if (typeof age === 'object') {
    const { anos, meses } = age;
    if (anos && meses) return `${anos} anos e ${meses} meses`;
    if (anos) return `${anos} anos`;
    if (meses) return `${meses} meses`;
  }
  return String(age);
}

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
        <View style={styles.contentContainer}>
          <View style={styles.petPhotoBox}>
            {pet.image ? (
              <Image source={pet.image} style={styles.petPhotoCircle} />
            ) : (
              <View style={styles.petPhotoPlaceholder}>
                <Ionicons name="image-outline" size={56} color="#563218" />
              </View>
            )}
          </View>
          <View style={styles.nameRow}>
            <Text style={styles.petName}>{pet.name}</Text>
            <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(pet.id)}>
              <Ionicons name={pet.isFavorite ? 'heart' : 'heart-outline'} size={28} color="#A0744F" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Informações Gerais do Pet</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <InfoTag text={pet.gender ? String(pet.gender) : 'Não informado'} style={styles.infoTag} />
              <View style={styles.tagSpacer} />
              <InfoTag text={formatAge(pet.age)} style={styles.infoTag} />
            </View>
            <View style={styles.infoRow}>
              <InfoTag text={pet.weight ? String(pet.weight) : 'Não informado'} style={styles.infoTag} />
              <View style={styles.tagSpacer} />
              <InfoTag text={pet.breed ? String(pet.breed) : 'Não informado'} style={styles.infoTag} />
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
    petPhotoBox: {
      alignItems: 'center',
      marginBottom: 18,
    },
    petPhotoCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#E1D8CF',
    },
    petPhotoPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#E1D8CF',
      alignItems: 'center',
      justifyContent: 'center',
    },
  container: {
    flex: 1,
    backgroundColor: '#D5C0AB',
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
    backgroundColor: '#D5C0AB',
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
