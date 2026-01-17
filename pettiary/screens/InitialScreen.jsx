import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import EventCard from '../components/display/EventCard';
import QuickActionButton from '../components/ui/QuickActionButton';
import ActionButton from '../components/ui/ActionButton';
import BottomNav from '../components/navigation/BottomNav';

const InitialScreen = () => {
  const [activeRoute, setActiveRoute] = useState('inicial');

  // Dados de exemplo
  const userName = 'CK';
  
  const upcomingEvents = [
    {
      title: 'Ir ao veterinário',
      petName: 'Lua',
      time: 'Hoje às 19h',
    },
    {
      title: 'Levar para Tosa',
      petName: 'Spike',
      time: 'Daqui a 3 dias',
    },
  ];

  const quickActions = [
    { icon: 'medication', label: 'Medicação', color: '#A0744F' },
    { icon: 'description', label: 'Notas', color: '#A0744F' },
    { icon: 'restaurant', label: 'Refeição', color: '#A0744F' },
    { icon: 'directions-walk', label: 'Passeio', color: '#A0744F' },
  ];

  const handleQuickAction = (label) => {
    console.log('Ação rápida:', label);
  };

  const handleNavigation = (route) => {
    setActiveRoute(route);
    console.log('Navegando para:', route);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.greeting}>
            Olá, {userName}
          </Text>
          <TouchableOpacity 
            style={styles.profileButton}
            activeOpacity={0.7}
          >
            <MaterialIcons name="account-circle" size={42} color="#9B7653" />
          </TouchableOpacity>
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
                  onPress={() => handleQuickAction(action.label)}
                />
              ))}
            </View>
          </View>

          {/* Assistente Virtual com Bolinha */}
          <View style={styles.assistantContainer}>
            <TouchableOpacity 
              style={styles.assistantButton}
              activeOpacity={0.8}
              onPress={() => console.log('Assistente')}
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
              onPress={() => console.log('Diário')}
            />
            <ActionButton
              icon="collections"
              label="Galeria"
              onPress={() => console.log('Galeria')}
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
});

export default InitialScreen;
