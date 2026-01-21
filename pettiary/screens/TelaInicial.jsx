import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { usePets } from '../components/contexts/Pets.Contexto';
import EventCard from '../components/display/CardEvento';
import QuickActionButton from '../components/ui/BotaoAcaoRapida';
import ActionButton from '../components/ui/BotaoAcao';
import BottomNav from '../components/navigation/Menu';

const InitialScreen = ({ onNavigate, userName = 'CK', profilePhoto, petEvents = {}, setPetEvents, onOpenNotes }) => {
  const { pets } = usePets();
  const [activeRoute, setActiveRoute] = useState('inicial');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const getUpcomingEvents = () => {
    const today = new Date();
    const allEvents = [];

    Object.entries(petEvents).forEach(([petId, petData]) => {
      const { petName, eventos } = petData;
      Object.entries(eventos).forEach(([day, eventTypes]) => {
        eventTypes.forEach(eventType => {
          const eventDate = new Date(petData.currentMonth);
          eventDate.setDate(parseInt(day));
          
          if (eventDate >= today) {
            const eventNames = {
              medicacao: 'Medicação',
              vacinacao: 'Vacinação',
              veterinario: 'Veterinário',
              banho: 'Banho/Tosa'
            };
            
            const diffTime = eventDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let timeStr;
            if (diffDays === 0) {
              timeStr = 'Hoje';
            } else if (diffDays === 1) {
              timeStr = 'Amanhã';
            } else {
              timeStr = `Daqui a ${diffDays} dias`;
            }
            
            allEvents.push({
              title: eventNames[eventType],
              petName: petName,
              time: timeStr,
              date: eventDate,
            });
          }
        });
      });
    });

    return allEvents
      .sort((a, b) => a.date - b.date)
      .slice(0, 2);
  };

  const upcomingEvents = getUpcomingEvents();

  const quickActions = [
    { icon: 'medication', label: 'Medicação', color: '#A0744F', type: 'medicacao' },
    { icon: 'description', label: 'Anotação', color: '#A0744F', type: 'anotacao' },
    { icon: 'restaurant', label: 'Refeição', color: '#A0744F', type: 'alimentacao' },
    { icon: 'directions-walk', label: 'Passeio', color: '#A0744F', type: 'passeio' },
  ];

  const handleQuickAction = (action) => {
    if (pets.length === 0) {
      alert('Você precisa cadastrar um pet primeiro!');
      return;
    }
    setSelectedAction(action);
    setModalVisible(true);
  };

  const handleSelectPet = (pet) => {
    // Se for anotação, abre a tela de notas
    if (selectedAction.type === 'anotacao') {
      setModalVisible(false);
      if (onOpenNotes) {
        onOpenNotes(pet);
      }
      return;
    }

    // Para outros tipos, marca direto
    const today = new Date();
    const currentDay = today.getDate();
    const dayOfWeek = today.getDay();
    
    if (setPetEvents) {
      setPetEvents(prevEvents => {
        const petData = prevEvents[pet.id] || {
          alimentacao: [false, false, false, false, false, false, false],
          passeio: [false, false, false, false, false, false, false],
          anotacao: [false, false, false, false, false, false, false],
          eventos: {},
          petName: pet.name,
          currentMonth: today.toISOString(),
        };

        let updatedData = { ...petData };
        
        if (selectedAction.type === 'medicacao') {
          // Marcar no calendario
          const currentEvents = petData.eventos[currentDay] || [];
          if (!currentEvents.includes('medicacao')) {
            updatedData.eventos = {
              ...petData.eventos,
              [currentDay]: [...currentEvents, 'medicacao']
            };
          }
        } else {
          // Marcar nas atividades semanais (alimentacao, passeio)
          const newArray = [...petData[selectedAction.type]];
          newArray[dayOfWeek] = true;
          updatedData[selectedAction.type] = newArray;
        }

        return {
          ...prevEvents,
          [pet.id]: updatedData
        };
      });
    }
    
    setModalVisible(false);
    alert(`${selectedAction.label} marcada para ${pet.name}!`);
  };

  const handleNavigation = (route) => {
    setActiveRoute(route);
    if (onNavigate) {
      onNavigate(route);
    }
    console.log('Navegando para:', route);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione um Pet</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={28} color="#563218" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={pets}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.petItem}
                  onPress={() => handleSelectPet(item)}
                  activeOpacity={0.7}
                >
                  {item.image ? (
                    <Image source={item.image} style={styles.petItemImage} />
                  ) : (
                    <View style={styles.petItemImagePlaceholder}>
                      <MaterialIcons name="pets" size={28} color="#563218" />
                    </View>
                  )}
                  <Text style={styles.petItemName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.greeting}>
            Olá, {userName}
          </Text>
          <View style={styles.profileButton}>
            {profilePhoto ? (
              <Image source={profilePhoto} style={styles.profileImage} />
            ) : (
              <MaterialIcons name="account-circle" size={42} color="#9B7653" />
            )}
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Card de Próximos Eventos */}
          <EventCard events={upcomingEvents} />

          {/* Ações Rápidas */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="flash-on" size={24} color="#3D2E1F" />
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Ações Rápidas
              </Text>
            </View>
            
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <QuickActionButton
                  key={index}
                  icon={action.icon}
                  label={action.label}
                  color={action.color}
                  onPress={() => handleQuickAction(action)}
                />
              ))}
            </View>
          </View>

          {/* Assistente Virtual com Bolinha */}
          <View style={styles.assistantContainer}>
            <TouchableOpacity 
              style={styles.assistantButton}
              activeOpacity={0.8}
              onPress={() => onNavigate && onNavigate('chatbot')}
            >
              <Text style={styles.assistantText}>Assistente Virtual</Text>
            </TouchableOpacity>
            <View style={styles.assistantIconCircle}>
              <MaterialIcons name="smart-toy" size={26} color="#362013" />
            </View>
          </View>

          {/* Botões Principais */}
          <View style={styles.mainButtons}>
            <ActionButton
              icon="menu-book"
              label="Diário"
              onPress={() => onNavigate && onNavigate('diaryList')}
            />
            <ActionButton
              icon="collections"
              label="Galeria"
              onPress={() => onNavigate && onNavigate('galeria')}
            />
          </View>

          {/* Espaçamento para o bottom nav */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav 
          activeRoute={activeRoute} 
          onNavigate={handleNavigation} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  container: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greeting: {
    color: '#2C1810',
    fontWeight: '400',
    fontSize: 28,
  },
  profileButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#2C1810',
    fontWeight: '600',
    fontSize: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  assistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    gap: 10,
  },
  assistantButton: {
    backgroundColor: '#D5C0AB',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  assistantText: {
    color: '#2C1810',
    fontSize: 15,
    fontWeight: '500',
  },
  assistantIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainButtons: {
    marginTop: 20,
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E1D8CF',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C1810',
  },
  petItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#D5C0AB',
    borderRadius: 12,
    marginBottom: 12,
  },
  petItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  petItemImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1D8CF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  petItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C1810',
  },
});

export default InitialScreen;
