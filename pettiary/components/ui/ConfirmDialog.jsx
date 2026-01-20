import React from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const ConfirmDialog = ({ visible, title, message, onConfirm, onCancel }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onCancel}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.title}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.message}>
          {message}
        </Text>
        <View style={styles.actions}>
          <Button mode="text" onPress={onCancel}>
            Cancelar
          </Button>
          <Button mode="contained" onPress={onConfirm}>
            Confirmar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 16,
  },
  title: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 24,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export default ConfirmDialog;
