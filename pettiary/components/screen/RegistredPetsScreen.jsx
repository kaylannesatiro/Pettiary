import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePets } from '../contexts/Pets.Context';
import Button from '../ui/Button';

const RegisteredPetsScreen = () => {
  const insets = useSafeAreaInsets();
  const { pets, getPetsByType, getFavoritePets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  const getFilteredPets = () => {
    if (activeFilter === 'favoritos') {
      return getFavoritePets();
    } else if (activeFilter === 'cachorros') {
      return getPetsByType('dog');
    } else if (activeFilter === 'gatos') {
      return getPetsByType('cat');
    }
    return pets;
  };

  const filteredPets = getFilteredPets();

  return (wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Animais Cadastrados</Text>
          <Text style={styles.title}>Animais Cadastrados</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
          <View style={styles.petItem}>
            <Text>{item.name}</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
    paddingHorizontal: 16,
  },
});

export default RegisteredPetsScreen;
