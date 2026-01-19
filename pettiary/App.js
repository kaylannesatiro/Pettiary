import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PetsProvider>
        <RegisteredPetsScreen />
      </PetsProvider>
    </SafeAreaProvider>
  );
}
