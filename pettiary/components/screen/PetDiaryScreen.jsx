import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PetDiaryScreen = ({ petName = 'Lua', onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#D5C0AB" />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{petName}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.placeholder}>Diário do Pet em construção...</Text>
        </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 64,
    backgroundColor: '#D5C0AB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  placeholder: {
    fontSize: 16,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default PetDiaryScreen;
