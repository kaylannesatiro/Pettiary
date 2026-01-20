import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PetHeader from '../ui/PetHeader';

const diaryEntries = [
  {
    id: '1',
    image: { uri: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80' },
    text: 'Lua comeu seu lanche',
  },
  {
    id: '2',
    image: { uri: 'https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=crop&w=400&q=80' },
    text: 'Thor ganhou uma flor',
  },
];

const DiaryListScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [date, setDate] = useState('01/11/2025');

  const handlePrevDate = () => {
    // Lógica para mudar a data para anterior
  };
  const handleNextDate = () => {
    // Lógica para mudar a data para próxima
  };

  const renderEntry = ({ item }) => (
    <View style={styles.cardPet}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.imagePet} resizeMode="cover" />
      </View>
      <Text style={styles.captionPet}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}> 
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <PetHeader petName="Diário" onBack={() => navigation?.goBack && navigation.goBack()} />
      <View style={styles.dateBar}>
        <TouchableOpacity onPress={handlePrevDate} style={styles.arrowBtn}>
          <Ionicons name="chevron-back" size={25} color="#A0744F" />
        </TouchableOpacity>
        <Text style={styles.dateBarText}>{date}</Text>
        <TouchableOpacity onPress={handleNextDate} style={styles.arrowBtn}>
          <Ionicons name="chevron-forward" size={25} color="#A0744F" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={diaryEntries}
        renderItem={renderEntry}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5C0AB',
    borderRadius: 24,
    marginTop: 18,
    marginBottom: 18,
    marginHorizontal: 12,
    height: 56,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  dateBarText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#362013',
    fontWeight: '400',
    fontFamily: 'Outfit_300Light',
    letterSpacing: 0.5,
    width: 286,
    height: 28,
    lineHeight: 28,
    alignSelf: 'center',
  },
  arrowBtn: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 32,
    color: '#A0744F',
    fontWeight: 'bold',
  },
  dateBarText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#362013',
    fontWeight: '400',
    fontFamily: 'Outfit_300Light',
    letterSpacing: 0.5,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  cardPet: {
    backgroundColor: '#E3D0BC',
    borderRadius: 18,
    marginBottom: 24,
    alignItems: 'center',
    width: 280,
    height: 277,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 250,
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePet: {
    width: 250,
    height: 200,
    borderRadius: 14,
  },
  captionPet: {
    color: '#7B5E3B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Outfit_300Light',
  },
});

export default DiaryListScreen;
