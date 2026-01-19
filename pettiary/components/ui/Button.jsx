import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title, variant = 'primary', selected = false }) => {
  const getButtonStyle = () => {
    if (variant === 'filter') {
      return selected ? styles.filterButtonSelected : styles.filterButton;
    }
    return styles.button;
  };

  const getTextStyle = () => {
    if (variant === 'filter') {
      return selected ? styles.filterTextSelected : styles.filterText;
    }
    return styles.text;
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress} activeOpacity={0.7}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8B6F47',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
  },
  filterButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  filterButtonSelected: {
    backgroundColor: '#8B6F47',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  filterText: {
    color: '#2D1810',
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
  },
  filterTextSelected: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
  },
});

export default Button;
