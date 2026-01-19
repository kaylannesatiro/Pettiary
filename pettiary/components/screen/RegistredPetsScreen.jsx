import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePets } from '../contexts/Pets.Context';
import SearchBar from '../inputs/SearchBar';
import Button from '../ui/Button';
import Card from '../display/Card';
import BottomNav from '../navigation/BottomNav';

const RegisteredPetsScreen = () => {
  const insets = useSafeAreaInsets();
  const { pets, toggleFavorite, getPetsByType, getFavoritePets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [activeTab, setActiveTab] = useState('animais');

  const getFilteredPets = () => {
    let filteredPets = pets;

    if (activeFilter === 'favoritos') {
      filteredPets = getFavoritePets();
    } else if (activeFilter === 'cachorros') {
      filteredPets = getPetsByType('dog');
    } else if (activeFilter === 'gatos') {
      filteredPets = getPetsByType('cat');
    }

    if (searchQuery.trim()) {
      filteredPets = filteredPets.filter(pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredPets;
  };

  const handlePetPress = (pet) => {
    console.log('Abrir diário de:', pet.name);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    console.log('Mudando para aba:', tabId);
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
          <Button
            title="Cachorros"
            variant="filter"
            selected={activeFilter === 'cachorros'}
            onPress={() => setActiveFilter('cachorros')}
          />
          <Button
            title="Gatos"
            variant="filter"
            selected={activeFilter === 'gatos'}
            onPress={() => setActiveFilter('gatos')}
          />
        </ScrollView>
      </View>

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            pet={item}
            onPress={() => handlePetPress(item)}
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
  bottomNav: {
    backgroundColor: '#563218',
  },
});

export default RegisteredPetsScreen;
