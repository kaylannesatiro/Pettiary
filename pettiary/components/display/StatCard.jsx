import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';

const StatCard = ({ title, value, icon, color, progress }) => {
  return (
    <Card style={[styles.card, { borderTopColor: color }]} mode="elevated">
      <Card.Content>
        <View style={styles.header}>
          <Text variant="labelLarge" style={styles.title}>
            {title}
          </Text>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
              <Text style={{ color, fontSize: 20 }}>{icon}</Text>
            </View>
          )}
        </View>
        
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
        
        {progress !== undefined && (
          <ProgressBar 
            progress={progress} 
            color={color} 
            style={styles.progress}
          />
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderTopWidth: 4,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progress: {
    height: 6,
    borderRadius: 3,
  },
});

export default StatCard;
