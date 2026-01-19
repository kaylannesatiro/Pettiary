import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, placeholder = "Buscar" }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B5544"
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="search" size={20} color="#2D1810" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D5C0AB',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
    color: '#2D1810',
    paddingVertical: 0,
  },
  iconContainer: {
    padding: 4,
  },
});

export default SearchBar;
