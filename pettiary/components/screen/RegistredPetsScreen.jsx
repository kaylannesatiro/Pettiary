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
  title: {
    fontSize: 24,
    color: '#2D1810',
  },
});

export default RegisteredPetsScreen;
