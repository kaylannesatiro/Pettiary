import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Switch, ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../components/navigation/BottomNav';
import EditProfileModal from '../components/ui/EditProfileModal';
import ChangePasswordModal from '../components/ui/ChangePasswordModal';
import { userService } from '../services/userService';

const ConfigScreen = ({ onNavigate, userName, setUserName }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [activeRoute, setActiveRoute] = useState('configuracoes');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveProfile = async (newName) => {
    try {
      // Simular salvamento do perfil
      // const response = await userService.updateProfile(1, { name: newName });
      // if (response.data.success) {
      setUserName(newName);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      // }
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      throw new Error('Erro ao salvar perfil');
    }
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      // Simular alteração de senha
      // const response = await userService.changePassword(1, currentPassword, newPassword);
      // if (response.data.success) {
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      // }
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw new Error(error.response?.data?.error || 'Erro ao alterar senha');
    }
  };

  const handleNavigation = (route) => {
    setActiveRoute(route);
    if (onNavigate) {
      onNavigate(route);
    }
    console.log('Navegando para:', route);
  };

  const MenuItem = ({ icon, label, onPress, showArrow = false, showSwitch = false, switchValue, onSwitchChange }) => {
    if (showSwitch) {
      return (
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            {icon && <MaterialIcons name={icon} size={24} color="#563218" style={styles.menuIcon} />}
            <Text style={styles.menuLabel}>{label}</Text>
          </View>
          <Switch 
            value={switchValue} 
            onValueChange={(value) => onSwitchChange(value)}
            trackColor={{ false: '#D5C0AB', true: '#9B7653' }}
            thumbColor={switchValue ? '#E1D8CF' : '#F5F0E8'}
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity 
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          {icon && <MaterialIcons name={icon} size={24} color="#563218" style={styles.menuIcon} />}
          <Text style={styles.menuLabel}>{label}</Text>
        </View>
        {showArrow && <MaterialIcons name="chevron-right" size={24} color="#9B7653" />}
      </TouchableOpacity>
    );
  };

  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9B7653" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E1D8CF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.headerTitle}>
            Configurações
          </Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileIconContainer}>
              <MaterialIcons name="account-circle" size={48} color="#9B7653" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userName}</Text>
              <Text style={styles.profileSubtitle}>Configurações da Conta</Text>
            </View>
          </View>

          <View style={styles.menuSection}>
            <MenuItem 
              label="Editar Perfil"
              showArrow
              onPress={() => setEditModalVisible(true)}
            />
            <MenuItem 
              label="Alterar senha"
              showArrow
              onPress={() => setPasswordModalVisible(true)}
            />
            <MenuItem 
              label="Ativar Modo Escuro"
              showSwitch={true}
              switchValue={darkMode}
              onSwitchChange={(value) => {
                console.log('Modo Escuro:', value);
                setDarkMode(value);
              }}
            />
            <MenuItem 
              label="Ativar Notificações"
              showSwitch={true}
              switchValue={notifications}
              onSwitchChange={(value) => {
                console.log('Notificações:', value);
                setNotifications(value);
              }}
            />
          </View>

          <View style={styles.aboutSection}>
            <SectionTitle title="Sobre" />
            <MenuItem 
              label="Sobre"
              onPress={() => console.log('Sobre')}
            />
            <MenuItem 
              label="Suporte"
              onPress={() => console.log('Suporte')}
            />
            <MenuItem 
              label="Política e Privacidade"
              onPress={() => console.log('Política e Privacidade')}
            />
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        <EditProfileModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          currentName={userName}
          onSave={handleSaveProfile}
        />
        <ChangePasswordModal
          visible={passwordModalVisible}
          onClose={() => setPasswordModalVisible(false)}
          onSave={handleChangePassword}
        />

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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    color: '#2C1810',
    fontWeight: '400',
    fontSize: 28,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#7D5E42',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D5C0AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C1810',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#7D5E42',
    fontWeight: '400',
  },
  menuSection: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D5C0AB',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: '#2C1810',
    fontWeight: '400',
  },
  aboutSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7D5E42',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default ConfigScreen;
