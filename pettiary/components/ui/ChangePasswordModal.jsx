import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ChangePasswordModal = ({ visible, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await onSave(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } catch (error) {
      alert(error.message || 'Erro ao alterar senha');
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
            <Text style={styles.title}>Alterar Senha</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#2C1810" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <TextInput
              label="Senha Atual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              outlineColor="#D5C0AB"
              activeOutlineColor="#9B7653"
              secureTextEntry={!showCurrentPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showCurrentPassword ? "eye-off" : "eye"}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                />
              }
            />
            <TextInput
              label="Nova Senha"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              outlineColor="#D5C0AB"
              activeOutlineColor="#9B7653"
              secureTextEntry={!showNewPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? "eye-off" : "eye"}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
            <TextInput
              label="Confirmar Nova Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              outlineColor="#D5C0AB"
              activeOutlineColor="#9B7653"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
          </View>

          <View style={styles.footer}>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.cancelButton}
              textColor="#7D5E42"
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={loading}
              disabled={loading}
              style={styles.saveButton}
              buttonColor="#A0744F"
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
    backgroundColor: '#E1D8CF',
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
    gap: 16,
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
    borderColor: '#D5C0AB',
  },
  saveButton: {
    elevation: 0,
  },
});

export default ChangePasswordModal;
