import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const PetDiaryScreen = ({ petName = 'Lua', onBack }) => {
  const insets = useSafeAreaInsets();
  
  const [diaryData, setDiaryData] = useState({
    alimentacao: [false, false, false, false, false, false, false],
    passeio: [false, false, false, false, false, false, false],
    anotacao: [false, false, false, false, false, false, false],
  });

  const renderWeeklyView = () => (
    <View style={styles.weeklyContainer}>
      <View style={styles.activityRow}>
        <Text style={styles.activityLabel}>Alimentação</Text>
        <View style={styles.dotsContainer}>
          {diaryData.alimentacao.map((checked, index) => (
            <TouchableOpacity
              key={`alimentacao-${index}`}
              style={[
                styles.dot,
                checked && styles.dotFilled,
                !checked && styles.dotEmpty,
              ]}
              activeOpacity={0.7}
            >
              {checked ? (
                <Text style={styles.dotTextWhite}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#8B6F47" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.activityRow}>
        <Text style={styles.activityLabel}>Passeio</Text>
        <View style={styles.dotsContainer}>
          {diaryData.passeio.map((checked, index) => (
            <TouchableOpacity
              key={`passeio-${index}`}
              style={[
                styles.dot,
                checked && styles.dotFilled,
                !checked && styles.dotEmpty,
              ]}
              activeOpacity={0.7}
            >
              {checked ? (
                <Text style={styles.dotTextWhite}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#8B6F47" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.activityRow}>
        <Text style={styles.activityLabel}>Anotação</Text>
        <View style={styles.dotsContainer}>
          {diaryData.anotacao.map((checked, index) => (
            <TouchableOpacity
              key={`anotacao-${index}`}
              style={[
                styles.dot,
                checked && styles.dotFilled,
                !checked && styles.dotEmpty,
              ]}
              activeOpacity={0.7}
            >
              {checked ? (
                <Text style={styles.dotTextWhite}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#8B6F47" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor="#D5C0AB" />
      
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={32} color="#8B6F47" />
          </TouchableOpacity>
          <Text style={styles.title}>{petName}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderWeeklyView()}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 64,
    backgroundColor: '#D5C0AB',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  weeklyContainer: {
    backgroundColor: '#E1D8CF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  activityRow: {
    marginBottom: 20,
  },
  activityLabel: {
    fontSize: 22,
    fontFamily: 'Outfit_300Light',
    color: '#000000',
    marginBottom: 8,
    letterSpacing: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#8B6F47',
  },
  dotFilled: {
    backgroundColor: '#8B6F47',
  },
  dotTextWhite: {
    fontSize: 18,
    fontFamily: 'Outfit_300Light',
    color: '#E1D8CF',
  },
});

export default PetDiaryScreen;
