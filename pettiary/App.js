import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import DiaryListScreen from './components/screen/DiaryListScreen';
import PetInfoScreen from './components/screen/PetInfoScreen';
import PetDiaryScreen from './components/screen/PetDiaryScreen';
import EditPetScreen from './components/screen/EditPetScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('diaryList');
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

  const handleOpenDiaryList = () => {
    setCurrentScreen('diaryList');
  };

  const handleBackToInfo = () => {
    setCurrentScreen('info');
  };

  const handleEditPet = () => {
    setCurrentScreen('edit');
  };

  const handleBackFromEdit = () => {
    setCurrentScreen('info');
  };

  return (
    <SafeAreaProvider>
      <PetsProvider>
        {currentScreen === 'list' && (
          <RegisteredPetsScreen 
            onOpenDiary={handleOpenPetInfo}
            onOpenDiaryDirect={handleOpenDiaryDirect}
            onOpenDiaryList={handleOpenDiaryList}
          />
        )}
                {currentScreen === 'diaryList' && (
                  <DiaryListScreen 
                    navigation={{ goBack: handleBackToList }}
                  />
                )}
        {currentScreen === 'info' && (
          <PetInfoScreen 
            petId={selectedPet}
            onBack={handleBackToList}
            onEdit={handleEditPet}
            onOpenDiary={handleOpenDiary}
          />
        )}
        {currentScreen === 'edit' && (
          <EditPetScreen 
            petId={selectedPet}
            onBack={handleBackFromEdit}
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
