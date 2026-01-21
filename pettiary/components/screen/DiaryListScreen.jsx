import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePets } from '../contexts/Pets.Context';
import PetHeader from '../ui/PetHeader';

const DiaryListScreen = ({ navigation, petEvents = {} }) => {
  const insets = useSafeAreaInsets();
  const { pets } = usePets();
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const [date, setDate] = useState(formattedDate);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
    const formatted = `${String(newDate.getDate()).padStart(2, '0')}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${newDate.getFullYear()}`;
    setDate(formatted);
  };

  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
    const formatted = `${String(newDate.getDate()).padStart(2, '0')}/${String(newDate.getMonth() + 1).padStart(2, '0')}/${newDate.getFullYear()}`;
    setDate(formatted);
  };

  // Gerar entradas do diário baseado nos petEvents
  const currentEntries = useMemo(() => {
    const entries = [];
    const selectedDate = new Date(currentDate);
    const selectedDay = selectedDate.getDate();
    const selectedDayOfWeek = selectedDate.getDay();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    Object.entries(petEvents).forEach(([petId, petData]) => {
      const pet = pets.find(p => p.id === petId);
      if (!pet) return;

      // Verificar eventos do calendário (medicação, vacinação, etc) para o dia específico
      if (petData.eventos && petData.eventos[selectedDay]) {
        const eventMonth = new Date(petData.currentMonth).getMonth();
        const eventYear = new Date(petData.currentMonth).getFullYear();
        
        // Só mostrar se for o mesmo mês/ano
        if (eventMonth === selectedMonth && eventYear === selectedYear) {
          petData.eventos[selectedDay].forEach((eventType, idx) => {
            const eventLabels = {
              medicacao: 'tomou medicação',
              vacinacao: 'tomou vacina',
              veterinario: 'foi ao veterinário',
              banho: 'tomou banho'
            };
            
            entries.push({
              id: `${petId}-${eventType}-${selectedDay}-${idx}`,
              petId: pet.id,
              petName: pet.name,
              petImage: pet.image,
              text: `${pet.name} ${eventLabels[eventType] || eventType}`,
              type: 'event',
              date: selectedDate.toISOString()
            });
          });
        }
      }

      // Verificar atividades semanais (alimentação, passeio) para o dia da semana
      if (petData.alimentacao && petData.alimentacao[selectedDayOfWeek]) {
        entries.push({
          id: `${petId}-alimentacao-${selectedDay}`,
          petId: pet.id,
          petName: pet.name,
          petImage: pet.image,
          text: `${pet.name} comeu`,
          type: 'activity',
          date: selectedDate.toISOString()
        });
      }

      if (petData.passeio && petData.passeio[selectedDayOfWeek]) {
        entries.push({
          id: `${petId}-passeio-${selectedDay}`,
          petId: pet.id,
          petName: pet.name,
          petImage: pet.image,
          text: `${pet.name} passeou`,
          type: 'activity',
          date: selectedDate.toISOString()
        });
      }

      // Verificar anotações
      if (petData.notes && petData.notes.length > 0) {
        petData.notes.forEach((note, idx) => {
          const noteDate = new Date(note.date);
          if (
            noteDate.getDate() === selectedDay &&
            noteDate.getMonth() === selectedMonth &&
            noteDate.getFullYear() === selectedYear
          ) {
            entries.push({
              id: `${petId}-note-${idx}`,
              petId: pet.id,
              petName: pet.name,
              petImage: pet.image,
              text: `Nota de ${pet.name}: ${note.text}`,
              type: 'note',
              date: note.date
            });
          }
        });
      }
    });

    // Ordenar por data (mais recente primeiro)
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [currentDate, petEvents, pets]);

  const renderEntry = ({ item }) => {
    // Determinar fonte da imagem
    let imageSource = null;
    if (item.petImage) {
      if (typeof item.petImage === 'string') {
        imageSource = { uri: item.petImage };
      } else {
        imageSource = item.petImage;
      }
    }

    return (
      <View style={styles.cardPet}>
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image source={imageSource} style={styles.imagePet} resizeMode="cover" />
          ) : (
            <Ionicons name="paw" size={64} color="#A0744F" />
          )}
        </View>
        <Text style={[styles.captionPet, item.type === 'note' && styles.noteText]} numberOfLines={item.type === 'note' ? 3 : 1}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}> 
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <PetHeader petName="Diário" onBack={() => navigation?.goBack && navigation.goBack()} />
      <View style={styles.dateBar}>
        <TouchableOpacity onPress={handlePrevDate} style={styles.arrowBtn}>
          <Ionicons name="chevron-back" size={25} color="#A0744F" />
        </TouchableOpacity>
        <Text style={styles.dateBarText}>{date}</Text>
        <TouchableOpacity onPress={handleNextDate} style={styles.arrowBtn}>
          <Ionicons name="chevron-forward" size={25} color="#A0744F" />
        </TouchableOpacity>
      </View>
      {currentEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#A0744F" />
          <Text style={styles.emptyText}>Nenhum registro neste dia</Text>
          <Text style={styles.emptySubText}>Adicione momentos especiais do seu pet!</Text>
        </View>
      ) : (
        <FlatList
          data={currentEntries}
          renderItem={renderEntry}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E1D8CF',
  },
  dateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5C0AB',
    borderRadius: 24,
    marginTop: 18,
    marginBottom: 18,
    marginHorizontal: 12,
    height: 44,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  dateBarText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: '#362013',
    fontWeight: '400',
    fontFamily: 'Outfit_300Light',
    letterSpacing: 0.5,
    width: 286,
    height: 28,
    lineHeight: 28,
    alignSelf: 'center',
  },
  arrowBtn: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 32,
    color: '#A0744F',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 20,
    color: '#362013',
    fontFamily: 'Outfit_300Light',
    marginTop: 24,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 16,
    color: '#7B5E3B',
    fontFamily: 'Outfit_300Light',
    marginTop: 8,
    textAlign: 'center',
  },
  dateBarText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 26,
    color: '#362013',
    fontWeight: '400',
    fontFamily: 'Outfit_300Light',
    letterSpacing: 0.5,
  },
  list: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  cardPet: {
    backgroundColor: '#E3D0BC',
    borderRadius: 18,
    marginBottom: 24,
    alignItems: 'center',
    width: 340,
    height: 277,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: 310,
    height: 200,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePet: {
    width: 310,
    height: 200,
    borderRadius: 14,
  },
  captionPet: {
    color: '#7B5E3B',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Outfit_300Light',
  },
  noteText: {
    fontSize: 14,
    textAlign: 'left',
    paddingHorizontal: 8,
  },
});

export default DiaryListScreen;
