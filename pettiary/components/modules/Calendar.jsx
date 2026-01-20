import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Calendar = ({ currentMonth, onMonthChange, eventos = {}, selectedDay, onDayPress }) => {
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    
    // Preencher dias vazios antes do primeiro dia
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Preencher dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDayColors = (day) => {
    if (!eventos[day]) return [];
    
    const eventosDay = eventos[day];
    const colors = [];
    const colorMap = {
      'medicacao': '#F5AE72',
      'vacinacao': '#DB6348',
      'veterinario': '#5DA6CD',
      'banho': '#6EA838'
    };
    
    eventosDay.forEach(evento => {
      if (colorMap[evento]) {
        colors.push(colorMap[evento]);
      }
    });
    
    // Retorna apenas a primeira cor por enquanto
    return colors.length > 0 ? [colors[0]] : [];
  };

  const renderDayBackground = (colors) => {
    if (colors.length === 0) return null;
    // Suporta apenas uma cor por enquanto
    return { backgroundColor: colors[0] };
  };

  const days = getCalendarDays();

  return (
    <View style={styles.container}>
      {/* Navegação do mês */}
      <View style={styles.monthNavigator}>
        <TouchableOpacity
          onPress={() => onMonthChange(-1)}
          style={styles.monthArrow}
        >
          <Ionicons name="chevron-back" size={25} color="#362013" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthNames[currentMonth.getMonth()]}</Text>
        <TouchableOpacity
          onPress={() => onMonthChange(1)}
          style={styles.monthArrow}
        >
          <Ionicons name="chevron-forward" size={25} color="#362013" />
        </TouchableOpacity>
      </View>

      {/* Cabeçalho dos dias da semana */}
      <View style={styles.separator} />
      <View style={styles.weekDaysHeader}>
        {weekDays.map((day, index) => (
          <View key={`weekday-${index}`} style={styles.weekDayContainer}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator} />

      {/* Grade do calendário */}
      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          const colors = day ? getDayColors(day) : [];
          const isSelected = day === selectedDay;
          const hasEvents = colors.length > 0;
          
          return (
            <View
              key={`day-${index}`}
              style={styles.calendarDayWrapper}
            >
              <TouchableOpacity
                style={[
                  styles.calendarDay,
                  day && styles.calendarDayActive,
                  !hasEvents && day && { backgroundColor: '#E1D8CF' },
                  isSelected && styles.calendarDaySelected,
                ]}
                disabled={!day}
                activeOpacity={0.7}
                onPress={() => day && onDayPress && onDayPress(day)}
              >
                {hasEvents && colors.length > 1 && renderDayBackground(colors)}
                {hasEvents && colors.length === 1 && (
                  <View style={[StyleSheet.absoluteFill, { backgroundColor: colors[0], borderRadius: 19 }]} />
                )}
                {day && (
                  <Text
                    style={[
                      styles.calendarDayText,
                      hasEvents && styles.calendarDayTextWhite,
                      isSelected && !hasEvents && styles.calendarDayTextSelected,
                    ]}
                  >
                    {day < 10 ? `0${day}` : day}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D5C0AB',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  monthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  monthArrow: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontFamily: 'Outfit_300Light',
    color: '#362013',
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: '#362013',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 6,
    marginBottom: 5,
    paddingHorizontal: 0,
    gap: 11,
  },
  weekDayContainer: {
    width: 38,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    color: '#362013',
    letterSpacing: 3.5,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 9,
    marginTop: 8,
  },
  calendarDayWrapper: {
    width: 38,
    paddingVertical: 3,
    alignItems: 'center',
  },
  calendarDay: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDayActive: {
    backgroundColor: '#E1D8CF',
  },
  calendarDaySelected: {
    borderWidth: 2,
    borderColor: '#8B6F47',
  },
  calendarDayText: {
    fontSize: 10,
    fontFamily: 'WorkSans_500Medium',
    color: '#A0744F',
  },
  calendarDayTextWhite: {
    color: '#FFFFFF',
    fontFamily: 'WorkSans_500Medium',
  },
  calendarDayTextSelected: {
    color: '#563218',
    fontFamily: 'WorkSans_500Medium',
  },
});

export default Calendar;
