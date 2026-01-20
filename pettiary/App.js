import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import InitialScreen from './screens/InitialScreen';
import ConfigScreen from './screens/ConfigScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import GalleryScreen from './screens/GalleryScreen';

// Tema com cores EXATAS da imagem
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#9B7653',        // Marrom dos botões
    secondary: '#B8956A',      
    tertiary: '#7D5E42',       
    background: '#E1D8CF',     // Bege/creme do fundo principal
    surface: '#F5F0E8',        
    surfaceVariant: '#D9C4B0', // Bege/rosado dos cards de evento
    onPrimary: '#FFFFFF',      
    onBackground: '#2C1810',   // Texto principal muito escuro
    onSurface: '#4A3829',      
    outline: '#C4B5A0',        
    error: '#B00020',
  },
  roundness: 24,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('inicial');
  const [userName, setUserName] = useState('CK');
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'configuracoes':
        return <ConfigScreen onNavigate={setCurrentScreen} userName={userName} setUserName={setUserName} />;
      case 'chatbot':
        return <ChatBotScreen onClose={() => setCurrentScreen('inicial')} />;
      case 'galeria':
        return <GalleryScreen navigation={{ goBack: () => setCurrentScreen('inicial') }} photos={galleryPhotos} setPhotos={setGalleryPhotos} />;
      case 'inicial':
      default:
        return <InitialScreen onNavigate={setCurrentScreen} userName={userName} />;
    }
  };

  return (
    <SafeAreaProvider>
      <PetsProvider>
        <RegisteredPetsScreen />
      </PetsProvider>
      <PaperProvider theme={theme}>
        {renderScreen()}
        <StatusBar style="dark" backgroundColor="#E1D8CF" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
