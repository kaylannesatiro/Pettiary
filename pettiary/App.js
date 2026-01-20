import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import PetInfoScreen from './components/screen/PetInfoScreen';
import PetDiaryScreen from './components/screen/PetDiaryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenPetInfo = (petId) => {
    setSelectedPet(petId);
    setCurrentScreen('info');
  };

  const handleOpenDiaryDirect = (petId) => {
    setSelectedPet(petId);
    setCurrentScreen('diary');
  };

  const handleOpenDiary = () => {
    setCurrentScreen('diary');
  };

  const handleBackToList = () => {
    setCurrentScreen('list');
    setSelectedPet(null);
  };

  const handleBackToInfo = () => {
    setCurrentScreen('info');
  };

  return (
    <SafeAreaProvider>
      <PetsProvider>
        {currentScreen === 'list' && (
          <RegisteredPetsScreen 
            onOpenDiary={handleOpenPetInfo}
            onOpenDiaryDirect={handleOpenDiaryDirect}
          />
        )}
        {currentScreen === 'info' && (
          <PetInfoScreen 
            petId={selectedPet}
            onBack={handleBackToList}
            onEdit={() => console.log('Editar pet')}
            onOpenDiary={handleOpenDiary}
          />
        )}
        {currentScreen === 'diary' && (
          <PetDiaryScreen 
            petName={selectedPet?.name} 
            onBack={handleBackToList} 
          />
        )}
      </PetsProvider>
    </SafeAreaProvider>
  );
}
