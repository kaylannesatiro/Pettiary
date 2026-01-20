import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePets } from '../contexts/Pets.Context';
import SearchBar from '../inputs/SearchBar';
import Button from '../ui/Button';
import Card from '../display/Card';
import BottomNav from '../navigation/BottomNav';

const RegisteredPetsScreen = ({ onOpenDiary, onOpenDiaryDirect, onAddPet }) => {
  const insets = useSafeAreaInsets();
  const { pets, toggleFavorite, getPetsByType, getFavoritePets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [activeTab, setActiveTab] = useState('animais');

  const getUniqueAnimalTypes = () => {
    const types = [...new Set(pets.map(pet => pet.type))];
    return types;
  };

  const getTypeLabel = (type) => {
    const labels = {
      'dog': 'Cachorros',
      'cat': 'Gatos',
      'bird': 'Pássaros',
      'rabbit': 'Coelhos',
      'hamster': 'Hamsters',
      'fish': 'Peixes',
      'turtle': 'Tartarugas',
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1) + 's';
  };

  const getFilteredPets = () => {
    let filteredPets = pets;

    if (activeFilter === 'favoritos') {
      filteredPets = getFavoritePets();
    } else if (activeFilter !== 'todos') {
      filteredPets = pets.filter(pet => pet.type === activeFilter);
    }

    if (searchQuery.trim()) {
      filteredPets = filteredPets.filter(pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredPets;
  };

  const handleCardPress = (pet) => {
    if (onOpenDiary) {
      onOpenDiary(pet.id);
    }
  };

  const handleDiaryPress = (pet) => {
    if (onOpenDiaryDirect) {
      onOpenDiaryDirect(pet);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  const filteredPets = getFilteredPets();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Animais Cadastrados</Text>

        </View>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar"
      />

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <Button
            title="Todos"
            variant="filter"
            selected={activeFilter === 'todos'}
            onPress={() => setActiveFilter('todos')}
          />
          <Button
            title="Favoritos"
            variant="filter"
            selected={activeFilter === 'favoritos'}
            onPress={() => setActiveFilter('favoritos')}
          />
          {getUniqueAnimalTypes().map((type) => (
            <Button
              key={type}
              title={getTypeLabel(type)}
              variant="filter"
              selected={activeFilter === type}
              onPress={() => setActiveFilter(type)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            pet={item}
            onPress={() => handleCardPress(item)}
            onDiaryPress={() => handleDiaryPress(item)}
            onToggleFavorite={toggleFavorite}
          />
        )}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery.trim()
                ? 'Nenhum animal encontrado com esse nome'
                : activeFilter === 'favoritos'
                ? 'Você ainda não marcou nenhum pet como favorito'
                : activeFilter === 'cachorros'
                ? 'Nenhum cachorro cadastrado'
                : activeFilter === 'gatos'
                ? 'Nenhum gato cadastrado'
                : 'Nenhum animal cadastrado ainda'}
            </Text>
          </View>
        }
      />
      </View>
            <TouchableOpacity style={styles.floatingButton} onPress={onAddPet}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
            <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
        <BottomNav activeRoute="animais" onNavigate={handleTabChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#E1D8CF',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit_300Light',
    color: '#2D1810',
    letterSpacing: 0.3,
  },
  filterContainer: {
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: '#E1D8CF',
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  scrollContent: {
    paddingBottom: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Outfit_300Light',
    color: '#6B5544',
    textAlign: 'center',
    lineHeight: 24,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#563218',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    backgroundColor: '#563218',
  },
});

export default RegisteredPetsScreen;
