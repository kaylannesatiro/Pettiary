import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const EventCard = ({ events }) => {
  return (
    <Card style={styles.card} mode="contained">
      <Card.Content>
        <View style={styles.header}>
          <MaterialIcons name="event" size={24} color="#9B7653" />
          <Text variant="titleMedium" style={styles.title}>
            Próximos Eventos
          </Text>
        </View>
        
        <View style={styles.eventsList}>
          {events.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.eventText}>
                <Text style={styles.eventName}>{event.title}</Text>
                <Text style={styles.petName}> ({event.petName})</Text>
                : {event.time}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D5C0AB',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  title: {
    color: '#2C1810',
    fontWeight: '600',
    fontSize: 15,
  },
  eventsList: {
    gap: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    color: '#9B7653',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventText: {
    color: '#2C1810',
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
  eventName: {
    fontWeight: '500',
  },
  petName: {
    fontWeight: '600',
    color: '#7D5E42',
  },
});

export default EventCard;
