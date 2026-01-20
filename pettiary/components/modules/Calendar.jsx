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
    
    return colors;
  };

  const renderDayBackground = (colors) => {
    if (colors.length === 0) return null;
    if (colors.length === 1) return { backgroundColor: colors[0] };
    
    // Para múltiplas cores, dividir em fatias circulares
    if (colors.length === 2) {
      return (
        <View style={styles.multiColorContainer}>
          <View style={[styles.halfCircleLeft, { backgroundColor: colors[0] }]} />
          <View style={[styles.halfCircleRight, { backgroundColor: colors[1] }]} />
        </View>
      );
    }
    
    if (colors.length === 3) {
      return (
        <View style={styles.multiColorContainer}>
          <View style={[styles.thirdTop, { backgroundColor: colors[0] }]} />
          <View style={[styles.thirdBottomLeft, { backgroundColor: colors[1] }]} />
          <View style={[styles.thirdBottomRight, { backgroundColor: colors[2] }]} />
        </View>
      );
    }
    
    if (colors.length === 4) {
      return (
        <View style={styles.multiColorContainer}>
          <View style={[styles.quarterTopLeft, { backgroundColor: colors[0] }]} />
          <View style={[styles.quarterTopRight, { backgroundColor: colors[1] }]} />
          <View style={[styles.quarterBottomLeft, { backgroundColor: colors[2] }]} />
          <View style={[styles.quarterBottomRight, { backgroundColor: colors[3] }]} />
        </View>
      );
    }
    
    return null;
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
    justifyContent: 'space-around',
    marginTop: 6,
    marginBottom: 5,
    paddingHorizontal: 0,
  },
  weekDayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    color: '#362013',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  calendarDayWrapper: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
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
  multiColorContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 19,
    overflow: 'hidden',
  },
  halfCircleLeft: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    left: 0,
    borderTopLeftRadius: 19,
    borderBottomLeftRadius: 19,
  },
  halfCircleRight: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
    borderTopRightRadius: 19,
    borderBottomRightRadius: 19,
  },
  thirdTop: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
  thirdBottomLeft: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    left: 0,
    bottom: 0,
    borderBottomLeftRadius: 19,
  },
  thirdBottomRight: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 19,
  },
  quarterTopLeft: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    left: 0,
    top: 0,
    borderTopLeftRadius: 19,
  },
  quarterTopRight: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    right: 0,
    top: 0,
    borderTopRightRadius: 19,
  },
  quarterBottomLeft: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    left: 0,
    bottom: 0,
    borderBottomLeftRadius: 19,
  },
  quarterBottomRight: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    right: 0,
    bottom: 0,
    borderBottomRightRadius: 19,
  },
});

export default Calendar;
