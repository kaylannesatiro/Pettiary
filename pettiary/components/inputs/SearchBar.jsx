import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder = "Buscar" }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D5C0AB',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 15,
    color: '#2D1810',
  },
});

export default SearchBar;
