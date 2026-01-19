import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePets } from '../contexts/Pets.Context';

const RegisteredPetsScreen = () => {
  const { pets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animais Cadastrados</Text>
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
