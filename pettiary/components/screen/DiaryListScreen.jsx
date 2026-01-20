import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PetHeader from '../ui/PetHeader';

// Diários organizados por data
const diaryEntriesByDate = {
  '20/01/2026': [
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
  ],
  '19/01/2026': [
    {
      id: '3',
      image: { uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80' },
      text: 'Mimi brincou no jardim',
    },
  ],
};

const DiaryListScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const [date, setDate] = useState(formattedDate);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    const formatted = `${String(newDate.getDate()).padStart(2, '0')}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${newDate.getFullYear()}`;
    setDate(formatted);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    const formatted = `${String(newDate.getDate()).padStart(2, '0')}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${newDate.getFullYear()}`;
    setDate(formatted);
  };

  // Filtrar entradas do diário pela data selecionada
  const currentEntries = useMemo(() => {
    return diaryEntriesByDate[date] || [];
  }, [date]);

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
      {currentEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#A0744F" />
          <Text style={styles.emptyText}>Nenhum registro neste dia</Text>
          <Text style={styles.emptySubText}>Adicione momentos especiais do seu pet!</Text>
        </View>
      ) : (
        <FlatList
          data={currentEntries}
          renderItem={renderEntry}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    height: 44,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 20,
    color: '#362013',
    fontFamily: 'Outfit_300Light',
    marginTop: 24,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 16,
    color: '#7B5E3B',
    fontFamily: 'Outfit_300Light',
    marginTop: 8,
    textAlign: 'center',
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
    width: 340,
    height: 277,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 310,
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePet: {
    width: 310,
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
