import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import InitialScreen from './screens/InitialScreen';

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
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <InitialScreen />
        <StatusBar style="dark" backgroundColor="#E8DCC8" />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
