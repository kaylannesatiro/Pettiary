import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Calendar from '../modules/Calendar';
import PetHeader from '../ui/PetHeader';

const PetDiaryScreen = ({ petId, petName = 'Lua', onBack, petEvents = {}, setPetEvents }) => {
  const insets = useSafeAreaInsets();
  const today = new Date();
  
  const [currentMonth, setCurrentMonth] = useState(today);
  const [diaryData, setDiaryData] = useState({
    alimentacao: [false, false, false, false, false, false, false],
    passeio: [false, false, false, false, false, false, false],
    anotacao: [false, false, false, false, false, false, false],
    eventos: {},
    petName: petName,
    currentMonth: today,
  });

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [modalVisible, setModalVisible] = useState(false);

  // Carregar dados do pet quando mudar o petId
  useEffect(() => {
    if (petEvents[petId]) {
      const loadedData = petEvents[petId];
      setDiaryData(loadedData);
      setCurrentMonth(new Date(loadedData.currentMonth || today.toISOString()));
    } else {
      // Pet novo, resetar dados
      const newData = {
        alimentacao: [false, false, false, false, false, false, false],
        passeio: [false, false, false, false, false, false, false],
        anotacao: [false, false, false, false, false, false, false],
        eventos: {},
        petName: petName,
        currentMonth: today.toISOString(),
      };
      setDiaryData(newData);
      setCurrentMonth(today);
    }
  }, [petId]);

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
    
    if (setPetEvents) {
      setPetEvents(prevEvents => ({
        ...prevEvents,
        [petId]: {
          ...diaryData,
          currentMonth: newMonth.toISOString(),
        }
      }));
    }
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
    const dayEvents = diaryData.eventos[day];
    if (dayEvents && dayEvents.length > 0) {
      setModalVisible(true);
    }
  };

  const getEventInfo = (eventType) => {
    const eventMap = {
      medicacao: { name: 'Medicação', color: '#F5AE72', icon: 'medical' },
      vacinacao: { name: 'Vacinação', color: '#DB6348', icon: 'fitness' },
      veterinario: { name: 'Veterinário', color: '#5DA6CD', icon: 'medkit' },
      banho: { name: 'Banho/Tosa', color: '#6EA838', icon: 'water' }
    };
    return eventMap[eventType];
  };

  const handleGenerateReport = () => {
    alert('Funcionalidade de gerar relatório em desenvolvimento');
  };

  const addEventToCalendar = (eventType) => {
    setDiaryData(prev => {
      const currentEvents = prev.eventos[selectedDay] || [];
      let updatedData;
      
      if (currentEvents.includes(eventType)) {
        const newEvents = currentEvents.filter(e => e !== eventType);
        const updatedEventos = { ...prev.eventos };
        if (newEvents.length === 0) {
          delete updatedEventos[selectedDay];
        } else {
          updatedEventos[selectedDay] = newEvents;
        }
        updatedData = { 
          ...prev, 
          eventos: updatedEventos,
          petName: petName,
          currentMonth: currentMonth.toISOString(),
        };
      } else {
        updatedData = {
          ...prev,
          eventos: {
            ...prev.eventos,
            [selectedDay]: [...currentEvents, eventType]
          },
          petName: petName,
          currentMonth: currentMonth.toISOString(),
        };
      }
      
      if (setPetEvents) {
        setPetEvents(prevEvents => ({
          ...prevEvents,
          [petId]: updatedData
        }));
      }
      
      return updatedData;
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
              {!checked ? (
                <Text style={styles.dotText}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
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
              {!checked ? (
                <Text style={styles.dotText}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
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
              {!checked ? (
                <Text style={styles.dotText}>
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][index]}
                </Text>
              ) : (
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
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
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Dia {selectedDay}</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={28} color="#8B6F47" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>Eventos agendados:</Text>
              {diaryData.eventos[selectedDay]?.map((eventType, index) => {
                const eventInfo = getEventInfo(eventType);
                return (
                  <View key={index} style={styles.eventItem}>
                    <View style={[styles.eventIcon, { backgroundColor: eventInfo.color }]}>
                      <Ionicons name={eventInfo.icon} size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.eventName}>{eventInfo.name}</Text>
                  </View>
                );
              })}
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={[styles.container, { paddingTop: insets.top }]}>
        <PetHeader petName={petName} onBack={onBack} />

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

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F5AE72' }]} />
              <Text style={styles.legendText}>Medicação</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#DB6348' }]} />
              <Text style={styles.legendText}>Vacinação</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#5DA6CD' }]} />
              <Text style={styles.legendText}>Veterinário</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#6EA838' }]} />
              <Text style={styles.legendText}>Banho/Tosa</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.reportButton}
            onPress={handleGenerateReport}
            activeOpacity={0.7}
          >
            <Text style={styles.reportButtonText}>Gerar Relatório</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
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
    justifyContent: 'flex-start',
    gap: 9,
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
  dotText: {
    fontSize: 18,
    fontFamily: 'Outfit_300Light',
    color: '#8B6F47',
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
  legendContainer: {
    backgroundColor: '#E1D8CF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -8,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E1D8CF',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontFamily: 'Outfit_600SemiBold',
    color: '#362013',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: 'Outfit_300Light',
    color: '#5C4A3A',
    marginBottom: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D5C0AB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventName: {
    fontSize: 16,
    fontFamily: 'Outfit_300Light',
    color: '#362013',
  },
  modalButton: {
    backgroundColor: '#8B6F47',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: 'Outfit_600SemiBold',
    color: '#FFFFFF',
  },
  reportButton: {
    backgroundColor: '#8B6F47',
    paddingVertical: 16,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 15,
    fontFamily: 'Outfit_300Light',
    color: '#FFFFFF',
  },
});

export default PetDiaryScreen;
