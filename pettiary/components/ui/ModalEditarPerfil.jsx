import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfileModal = ({ visible, onClose, currentName, onSave }) => {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Por favor, insira um nome válido');
      return;
    }

    setLoading(true);
    try {
      await onSave(name);
      onClose();
    } catch (error) {
      alert('Erro ao salvar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar Perfil</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#9B7653" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TextInput
              label="Nome"
              value={name}
              onChangeText={setName}
              mode="outlined"
              outlineColor="#D5C0AB"
              activeOutlineColor="#9B7653"
              style={styles.input}
            />
          </View>

          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.cancelButton}
              textcolor="#9B7653"
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
              style={styles.saveButton}
              buttonColor="#9B7653"
            >
              Salvar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#F5F0E8',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D5C0AB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C1810',
  },
  content: {
    padding: 20,
  },
  input: {
    backgroundColor: '#F5F0E8',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    gap: 12,
  },
  cancelButton: {
    borderColor: '#9B7653',
  },
  saveButton: {
    elevation: 0,
  },
});

export default EditProfileModal;
