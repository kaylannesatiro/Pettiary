
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../contexts/Pets.Context';

const EditPetScreen = ({ petId, onBack }) => {
  const { getPetById, updatePet } = usePets();
  const pet = getPetById(petId);
  // Separar idade em número e unidade
  const ageMatch = pet?.age ? pet.age.match(/(\d+)\s*(meses|anos)/) : null;
  const [name, setName] = useState(pet?.name || '');
  const [ageNumber, setAgeNumber] = useState(ageMatch ? ageMatch[1] : '');
  const [ageUnit, setAgeUnit] = useState(ageMatch ? ageMatch[2] : 'meses');
  // Remover select dropdown, usar botões lado a lado
  const [weight, setWeight] = useState(pet?.weight || '');
  const [breed, setBreed] = useState(pet?.breed || '');
  const [image, setImage] = useState(pet?.image || null);

  // Simulação de seleção de imagem (expo-image-picker)
  const handleSelectImage = async () => {
    // Aqui você pode integrar com expo-image-picker
    // Exemplo:
    // const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1,1], quality: 1 });
    // if (!result.canceled) setImage({ uri: result.assets[0].uri });
    // Simulação:
    Alert.alert('Atualizar Foto', 'Funcionalidade de escolher foto pode ser ativada com expo-image-picker. Por enquanto, foto simulada.');
    setImage({ uri: 'https://placekitten.com/300/300' });
  };

  const handleSave = () => {
    const age = `${ageNumber} ${ageUnit}`;
    updatePet(petId, { name, age, weight, breed, image });
    if (onBack) onBack();
  };

  if (!pet) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Pet</Text>
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
// Removido bloco duplicado de estilos incorreto
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Peso"
          />
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#D5C0AB',
    padding: 24,
    justifyContent: 'center',
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
  title: {
    fontSize: 28,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
    marginBottom: 24,
    textAlign: 'center',
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
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ageInput: {
    flex: 2,
    marginRight: 8,
  },
  unitSelect: {
    flex: 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  unitSelectText: {
    color: '#563218',
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
  },
  unitOptionsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D5C0AB',
    marginTop: 4,
    marginBottom: 8,
    padding: 8,
  },
  unitOption: {
    color: '#563218',
    fontFamily: 'Outfit_400Regular',
    fontSize: 16,
    paddingVertical: 6,
    textAlign: 'center',
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
