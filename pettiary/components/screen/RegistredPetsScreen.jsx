import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { usePets } from '../contexts/Pets.Context';
import Button from '../ui/Button';

const RegisteredPetsScreen = () => {
  const { pets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
    </View>
  );
};

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
