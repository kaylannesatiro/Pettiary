import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import PetInfoScreen from './components/screen/PetInfoScreen';
import PetDiaryScreen from './components/screen/PetDiaryScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);

  const handleOpenPetInfo = (pet) => {
    setSelectedPet(pet);
    setCurrentScreen('info');
  };

  const handleOpenDiaryDirect = (pet) => {
    setSelectedPet(pet);
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
            petName={selectedPet?.name}
            petType={selectedPet?.type}
            gender={selectedPet?.gender}
            age={selectedPet?.age}
            weight={selectedPet?.weight || 'N/A'}
            breed={selectedPet?.breed || 'Vira-lata'}
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
