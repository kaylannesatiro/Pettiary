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
import Calendar from '../modules/Calendar';

const PetDiaryScreen = ({ petName = 'Lua', onBack }) => {
  const insets = useSafeAreaInsets();
  
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6, 1));
  const [diaryData, setDiaryData] = useState({
    alimentacao: [false, true, false, true, true, true, true],
    passeio: [true, true, false, true, true, true, true],
    anotacao: [false, true, false, true, true, true, true],
    eventos: {},
  });

  const [selectedDay, setSelectedDay] = useState(19);

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };

  const addEventToCalendar = (eventType) => {
    setDiaryData(prev => {
      const currentEvents = prev.eventos[selectedDay] || [];
      if (currentEvents.includes(eventType)) {
        const newEvents = currentEvents.filter(e => e !== eventType);
        const updatedEventos = { ...prev.eventos };
        if (newEvents.length === 0) {
          delete updatedEventos[selectedDay];
        } else {
          updatedEventos[selectedDay] = newEvents;
        }
        return { ...prev, eventos: updatedEventos };
      } else {
        return {
          ...prev,
          eventos: {
            ...prev.eventos,
            [selectedDay]: [...currentEvents, eventType]
          }
        };
      }
    });
  };

  const toggleWeeklyActivity = (activity, index) => {
    setDiaryData(prev => ({
      ...prev,
      [activity]: prev[activity].map((val, i) => i === index ? !val : val)
    }));
  };

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
              onPress={() => toggleWeeklyActivity('alimentacao', index)}
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
              onPress={() => toggleWeeklyActivity('passeio', index)}
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
              onPress={() => toggleWeeklyActivity('anotacao', index)}
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

          <View style={styles.cardContainer}>
            <View style={styles.actionButtonsContainer}>
              <View style={styles.actionButtonRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => addEventToCalendar('medicacao')}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonContent}>
                    <Ionicons 
                      name={diaryData.eventos[selectedDay]?.includes('medicacao') ? "remove-circle-outline" : "add-circle-outline"} 
                      size={18} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.actionButtonText}>Medicação</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => addEventToCalendar('vacinacao')}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonContent}>
                    <Ionicons 
                      name={diaryData.eventos[selectedDay]?.includes('vacinacao') ? "remove-circle-outline" : "add-circle-outline"} 
                      size={18} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.actionButtonText}>Vacinação</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.actionButtonRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => addEventToCalendar('veterinario')}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonContent}>
                    <Ionicons 
                      name={diaryData.eventos[selectedDay]?.includes('veterinario') ? "remove-circle-outline" : "add-circle-outline"} 
                      size={18} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.actionButtonText}>Veterinário</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => addEventToCalendar('banho')}
                  activeOpacity={0.7}
                >
                  <View style={styles.actionButtonContent}>
                    <Ionicons 
                      name={diaryData.eventos[selectedDay]?.includes('banho') ? "remove-circle-outline" : "add-circle-outline"} 
                      size={18} 
                      color="#FFFFFF" 
                    />
                    <Text style={styles.actionButtonText}>Banho/Tosa</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Calendar
              currentMonth={currentMonth}
              onMonthChange={changeMonth}
              eventos={diaryData.eventos}
              selectedDay={selectedDay}
              onDayPress={handleDayPress}
            />
          </View>
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
  cardContainer: {
    backgroundColor: '#D5C0AB',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#8B6F47',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Outfit_300Light',
    color: '#FFFFFF',
  },
});

export default PetDiaryScreen;
