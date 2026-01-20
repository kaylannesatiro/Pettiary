import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import PetDiaryScreen from './components/screen/PetDiaryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenDiary = (pet) => {
    setSelectedPet(pet);
    setCurrentScreen('diary');
  };

  const handleBackToList = () => {
    setCurrentScreen('list');
    setSelectedPet(null);
  };

  return (
    <SafeAreaProvider>
      <PetsProvider>
        {currentScreen === 'list' ? (
          <RegisteredPetsScreen onOpenDiary={handleOpenDiary} />
        ) : (
          <PetDiaryScreen 
            petName={selectedPet?.name} 
            onBack={handleBackToList} 
          />
        )}
      </PetsProvider>
    </SafeAreaProvider>
  );
}
