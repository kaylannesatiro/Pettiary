import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoTag = ({ text, style }) => {
  return (
    <View style={[styles.tag, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#E1D8CF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Outfit_400Regular',
    color: '#563218',
  },
});

export default InfoTag;
