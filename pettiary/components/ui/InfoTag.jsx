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
    backgroundColor: '#E8DDD0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
  },
});

export default InfoTag;
