import React from 'react';
import { Card, Text, Checkbox, IconButton, Chip } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const ActivityCard = ({ activity, onToggle, onEdit, onDelete }) => {
    const getActivityIcon = (type) => {
        const icons = {
            feeding: 'food',
            walk: 'walk',
            vet: 'hospital-box',
            grooming: 'shower',
            play: 'basketball',
            medication: 'pill',
        };
        return icons[type] || 'calendar';
    };

    const getActivityColor = (type) => {
        const colors = {
            feeding: '#FF6B35',
            walk: '#4CAF50',
            vet: '#2196F3',
            grooming: '#9C27B0',
            play: '#FFC107',
            medication: '#F44336',
        };
        return colors[type] || '#757575';
    };

    const formatTime = (time) => {
        if (!time) return '';
        return time.substring(0, 5);
    };

return (
    <Card style={[
        styles.card,
        activity.completed && styles.completedCard
    ]}
        mode="elevated"
        elevation={1}
    >
    
    <Card.Content style={styles.content}>
        <Checkbox
            status={activity.completed ? 'checked' : 'unchecked'}
            onPress={() => onToggle && onToggle(activity)}
            color={getActivityColor(activity.type)}
        />

        <View style={styles.info}>
            <View style={styles.titleRow}>
                <Chip 
                    icon={getActivityIcon(activity.type)}
                    style={[styles.chip, { backgroundColor: getActivityColor(activity.type) + '20' }]}
                    textStyle={{ color: getActivityColor(activity.type) }}
                    compact
                >
                    {activity.type}
                </Chip>
                    {activity.time && (
                        <Text variant="bodySmall" style={styles.time}>
                            {formatTime(activity.time)}
                        </Text>
                    )}
            </View>
        
            <Text 
                variant="titleMedium" 
                style={[
                    styles.title,
                    activity.completed && styles.completedText
                ]}
            >
                {activity.title}
            </Text>
        
            {activity.description && (
                <Text 
                    variant="bodySmall" 
                    style={[
                        styles.description,
                        activity.completed && styles.completedText
                    ]}
                    numberOfLines={2}
                >
                    {activity.description}
                </Text>
            )}
        </View>

        <View style={styles.actions}>
            <IconButton
                icon="pencil"
                size={20}
                onPress={() => onEdit && onEdit(activity)}
            />

            <IconButton
                icon="delete"
                size={20}
                iconColor="#B00020"
                onPress={() => onDelete && onDelete(activity)}
            />
        </View>
        </Card.Content>
    </Card>
);
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 6,
        borderRadius: 12,
    },

    completedCard: {
        opacity: 0.6,
    },

    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },

    info: {
        flex: 1,
        marginLeft: 8,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    chip: {
        height: 28,
    },

    time: {
        fontWeight: 'bold',
    },

    title: {
        fontWeight: '600',
        marginVertical: 4,
    },

    description: {
        opacity: 0.7,
        marginTop: 2,
    },

    completedText: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },

    actions: {
        flexDirection: 'row',
    },
});

export default ActivityCard;
