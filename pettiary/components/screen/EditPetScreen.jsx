
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../contexts/Pets.Context';

const EditPetScreen = ({ petId, onBack }) => {
  const { getPetById, updatePet } = usePets();
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

  const handleSelectImage = async () => {
    Alert.alert('Atualizar Foto', 'Funcionalidade de escolher foto pode ser ativada com expo-image-picker. Por enquanto, foto simulada.');
    setImage({ uri: 'https://placekitten.com/300/300' });
  };

  const handleSave = () => {
    const age = `${ageNumber} ${ageUnit}`;
    const weight = `${weightNumber} ${weightUnit}`;
    updatePet(petId, { name, age, weight, breed, image });
    if (onBack) onBack();
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
            onChangeText={setBreed}
            placeholder="Raça"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
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
});

export default EditPetScreen;
