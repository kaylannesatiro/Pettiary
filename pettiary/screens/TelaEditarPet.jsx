
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { usePets } from '../components/contexts/Pets.Contexto';

const BREEDS = [
  'Akita', 'Beagle', 'Bichon Frisé', 'Border Collie', 'Boxer', 'Bulldog Francês', 'Bulldog Inglês',
  'Chihuahua', 'Chow Chow', 'Cocker Spaniel', 'Dachshund (Salsicha)', 'Dálmata', 'Doberman',
  'Fila Brasileiro', 'Golden Retriever', 'Husky Siberiano', 'Jack Russell Terrier', 'Labrador',
  'Lhasa Apso', 'Lulu da Pomerânia', 'Maltês', 'Mastiff', 'Pastor Alemão', 'Pastor Australiano',
  'Pinscher', 'Pit Bull', 'Poodle', 'Pug', 'Rottweiler', 'Schnauzer', 'Shih Tzu', 'Spitz Alemão',
  'Staffordshire', 'Teckel', 'Terrier Brasileiro', 'Vira-lata', 'Weimaraner', 'Yorkshire',
  'Abissínio', 'Angorá', 'Bengal', 'Birmanês', 'British Shorthair', 'Chartreux', 'Cornish Rex',
  'Devon Rex', 'Exótico', 'Himalaio', 'Maine Coon', 'Manx', 'Mau Egípcio', 'Norueguês da Floresta',
  'Persa', 'Ragdoll', 'Russo Azul', 'Savannah', 'Scottish Fold', 'Siamês', 'Sphynx', 'SRD (Sem Raça Definida)',
  'Tonquinês', 'Turkish Angora', 'Coelho', 'Hamster', 'Porquinho da Índia', 'Chinchila', 'Ferret', 'Papagaio', 'Calopsita',
  'Periquito', 'Arara', 'Canário', 'Tartaruga', 'Iguana'
].sort();

const EditPetScreen = ({ petId, onBack, onDelete }) => {
  const { getPetById, updatePet, removePet } = usePets();
  const pet = getPetById(petId);
  const ageMatch = pet?.age ? pet.age.match(/(\d+)\s*(meses|anos)/) : null;
  const weightMatch = pet?.weight ? pet.weight.match(/(\d+(?:\.\d+)?)\s*(kg|g)/) : null;
  const [name, setName] = useState(pet?.name || '');
  const [ageNumber, setAgeNumber] = useState(ageMatch ? ageMatch[1] : '');
  const [ageUnit, setAgeUnit] = useState(ageMatch ? ageMatch[2] : 'meses');
  const [weightNumber, setWeightNumber] = useState(weightMatch ? weightMatch[1] : '');
  const [weightUnit, setWeightUnit] = useState(weightMatch ? weightMatch[2] : 'kg');
  const [breed, setBreed] = useState(pet?.breed || '');
  const [image, setImage] = useState(pet?.image || null);
  const [showBreedSuggestions, setShowBreedSuggestions] = useState(false);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria para selecionar uma foto.');
      return;
    }

    // Abrir galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const handleBreedChange = (text) => {
    setBreed(text);
    if (text.length > 0) {
      const filtered = BREEDS.filter(b => 
        b.toLowerCase().includes(text.toLowerCase())
      ).slice(0, 10);
      setFilteredBreeds(filtered);
      setShowBreedSuggestions(filtered.length > 0);
    } else {
      setShowBreedSuggestions(false);
    }
  };

  const selectBreed = (selectedBreed) => {
    setBreed(selectedBreed);
    setShowBreedSuggestions(false);
  };

  const handleSave = () => {
    const age = `${ageNumber} ${ageUnit}`;
    const weight = `${weightNumber} ${weightUnit}`;
    updatePet(petId, { name, age, weight, breed, image });
    if (onBack) onBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Pet',
      `Tem certeza que deseja excluir ${name}? Esta ação não pode ser desfeita.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removePet(petId);
            if (onDelete) {
              onDelete();
            } else if (onBack) {
              onBack();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!pet) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#563218" />
        </TouchableOpacity>
        <Text style={styles.title}>Editar Pet</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
        <View style={styles.photoArea}>
          {image ? (
            <Image source={image} style={styles.petImageBig} />
          ) : (
            <View style={styles.placeholderImageBig}><Ionicons name="image-outline" size={48} color="#563218" /></View>
          )}
          <TouchableOpacity style={styles.editPhotoBtn} onPress={handleSelectImage}>
            <Ionicons name="camera" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome"
          />
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Idade</Text>
          <View style={styles.ageRowBetter}>
            <TextInput
              style={styles.ageInputBetter}
              value={ageNumber}
              onChangeText={setAgeNumber}
              placeholder="Número"
              keyboardType="numeric"
            />
            <View style={styles.unitButtonsRow}>
              <TouchableOpacity
                style={[styles.unitButton, ageUnit === 'meses' && styles.unitButtonSelected]}
                onPress={() => setAgeUnit('meses')}
              >
                <Text style={[styles.unitButtonText, ageUnit === 'meses' && styles.unitButtonTextSelected]}>meses</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, ageUnit === 'anos' && styles.unitButtonSelected]}
                onPress={() => setAgeUnit('anos')}
              >
                <Text style={[styles.unitButtonText, ageUnit === 'anos' && styles.unitButtonTextSelected]}>anos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Peso</Text>
          <View style={styles.ageRowBetter}>
            <TextInput
              style={styles.ageInputBetter}
              value={weightNumber}
              onChangeText={setWeightNumber}
              placeholder="Número"
              keyboardType="numeric"
            />
            <View style={styles.unitButtonsRow}>
              <TouchableOpacity
                style={[styles.unitButton, weightUnit === 'kg' && styles.unitButtonSelected]}
                onPress={() => setWeightUnit('kg')}
              >
                <Text style={[styles.unitButtonText, weightUnit === 'kg' && styles.unitButtonTextSelected]}>kg</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitButton, weightUnit === 'g' && styles.unitButtonSelected]}
                onPress={() => setWeightUnit('g')}
              >
                <Text style={[styles.unitButtonText, weightUnit === 'g' && styles.unitButtonTextSelected]}>g</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Raça</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={handleBreedChange}
            onFocus={() => breed.length > 0 && handleBreedChange(breed)}
            placeholder="Raça"
          />
          {showBreedSuggestions && (
            <View style={styles.suggestionsContainer}>
              <ScrollView nestedScrollEnabled={true} style={styles.suggestionsScroll}>
                {filteredBreeds.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => selectBreed(item)}
                  >
                    <Text style={styles.suggestionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Excluir Pet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onBack}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D5C0AB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
    photoArea: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      position: 'relative',
    },
    petImageBig: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: '#E1D8CF',
    },
    placeholderImageBig: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: '#E1D8CF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    editPhotoBtn: {
      position: 'absolute',
      right: 10,
      bottom: 10,
      backgroundColor: '#563218',
      borderRadius: 20,
      padding: 8,
      zIndex: 2,
    },
    editPhotoIcon: {
      color: '#fff',
      fontSize: 18,
    },
    fieldRow: {
      marginBottom: 12,
    },
  card: {
    backgroundColor: '#E1D8CF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
    borderWidth: 1,
    borderColor: '#D5C0AB',
  },
  ageRowBetter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ageInputBetter: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
    borderWidth: 1,
    borderColor: '#D5C0AB',
  },
  unitButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  unitButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D5C0AB',
  },
  unitButtonSelected: {
    backgroundColor: '#563218',
    borderColor: '#563218',
  },
  unitButtonText: {
    color: '#563218',
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
  },
  unitButtonTextSelected: {
    color: '#fff',
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5C0AB',
    marginTop: 4,
    maxHeight: 200,
    overflow: 'hidden',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1D8CF',
  },
  suggestionText: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
  },
  button: {
    backgroundColor: '#563218',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  cancelButton: {
    alignItems: 'center',
    padding: 10,
  },
  cancelText: {
    color: '#563218',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#B00020',
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  deleteText: {
    color: '#B00020',
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
  },
});

export default EditPetScreen;
