import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PetsProvider } from './components/contexts/Pets.Context';
import RegisteredPetsScreen from './components/screen/RegistredPetsScreen';
import PetInfoScreen from './components/screen/PetInfoScreen';
import PetDiaryScreen from './components/screen/PetDiaryScreen';
import EditPetScreen from './components/screen/EditPetScreen';
import AddPetScreen from './components/screen/AddPetScreen';

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

  const handleEditPet = () => {
    setCurrentScreen('edit');
  };

  const handleBackFromEdit = () => {
    setCurrentScreen('info');
  };

  const handleAddPet = () => {
    setCurrentScreen('add');
  };

  const handleBackFromAdd = () => {
    setCurrentScreen('list');
  };

  return (
    <SafeAreaProvider>
      <PetsProvider>
        {currentScreen === 'list' && (
          <RegisteredPetsScreen 
            onOpenDiary={handleOpenPetInfo}
            onOpenDiaryDirect={handleOpenDiaryDirect}
            onAddPet={handleAddPet}
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
        {currentScreen === 'add' && (
          <AddPetScreen 
            onBack={handleBackFromAdd}
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
