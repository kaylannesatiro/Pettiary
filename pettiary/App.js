import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { PetsProvider, usePets } from './components/contexts/Pets.Contexto';
import InitialScreen from './screens/TelaInicial';
import ConfigScreen from './screens/TelaConfig';
import ChatBotScreen from './screens/TelaChatBot';
import GalleryScreen from './screens/TelaGaleria';
import RegisteredPetsScreen from './screens/TelaPetsRegistrados';
import DiaryListScreen from './screens/TelaListaDiarios';
import PetInfoScreen from './screens/TelaInfoPet';
import PetDiaryScreen from './screens/TelaDiarioPet';
import EditPetScreen from './screens/TelaEditarPet';
import AddPetScreen from './screens/TelaAdicionarPet';
import NotesScreen from './screens/TelaNotas';

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
      <PetsProvider>
        <PaperProvider theme={theme}>
          <AppContent />
        </PaperProvider>
      </PetsProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { getPetById } = usePets();
  const [currentScreen, setCurrentScreen] = useState('inicial');
  const [userName, setUserName] = useState('CK');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petEvents, setPetEvents] = useState({});
  const [selectedPetForNote, setSelectedPetForNote] = useState(null);

  const handleOpenPetInfo = (petId) => {
    setSelectedPet(petId);
    setCurrentScreen('info');
  };

  const handleOpenDiaryDirect = (pet) => {
    setSelectedPet(pet);
    setCurrentScreen('diary');
  };

  const handleOpenDiary = (pet) => {
    setSelectedPet(pet);
    setCurrentScreen('diary');
  };

  const handleBackToList = () => {
    setCurrentScreen('animais');
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

  const handleAddPet = () => {
    setCurrentScreen('add');
  };

  const handleBackFromAdd = () => {
    setCurrentScreen('animais');
  };

  const handleOpenNotes = (pet) => {
    setSelectedPetForNote(pet);
    setCurrentScreen('notes');
  };

  const handleSaveNote = (pet, noteText) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    setPetEvents(prevEvents => {
      const petData = prevEvents[pet.id] || {
        alimentacao: Array(7).fill(false),
        passeio: Array(7).fill(false),
        anotacao: Array(7).fill(false),
        eventos: {},
        petName: pet.name,
        currentMonth: today.getMonth(),
        notes: []
      };

      const updatedAnotacao = [...petData.anotacao];
      updatedAnotacao[dayOfWeek] = true;

      const updatedNotes = petData.notes || [];
      updatedNotes.push({
        text: noteText,
        date: today.toISOString(),
        petName: pet.name
      });

      return {
        ...prevEvents,
        [pet.id]: {
          ...petData,
          anotacao: updatedAnotacao,
          notes: updatedNotes
        }
      };
    });

    alert(`Anotação salva para ${pet.name}!`);
    setCurrentScreen('inicial');
  };

  const handleBackFromNotes = () => {
    setCurrentScreen('inicial');
    setSelectedPetForNote(null);
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case 'configuracoes':
        return <ConfigScreen onNavigate={setCurrentScreen} userName={userName} setUserName={setUserName} profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
      case 'chatbot':
        return <ChatBotScreen onClose={() => setCurrentScreen('inicial')} />;
      case 'galeria':
        return <GalleryScreen navigation={{ goBack: () => setCurrentScreen('inicial') }} photos={galleryPhotos} setPhotos={setGalleryPhotos} />;
      case 'diaryList':
        return <DiaryListScreen navigation={{ goBack: () => setCurrentScreen('inicial') }} petEvents={petEvents} />;
      case 'animais':
      case 'list':
        return (
          <RegisteredPetsScreen 
            onOpenDiary={handleOpenPetInfo}
            onOpenDiaryDirect={handleOpenDiaryDirect}
            onNavigate={setCurrentScreen}
            onOpenDiaryList={handleOpenDiaryList}
            onAddPet={handleAddPet}
          />
        );
      case 'info':
        const infoPet = getPetById(selectedPet);
        return (
          <PetInfoScreen 
            petId={selectedPet}
            onBack={handleBackToList}
            onEdit={handleEditPet}
            onOpenDiary={() => handleOpenDiary(infoPet)}
          />
        );
      case 'edit':
        return (
          <EditPetScreen 
            petId={selectedPet}
            onBack={handleBackFromEdit}
            onDelete={handleBackToList}
          />
        );
      case 'add':
        return (
          <AddPetScreen 
            onBack={handleBackFromAdd}
          />
        );
      case 'diary':
        return (
          <PetDiaryScreen 
            petId={selectedPet?.id || selectedPet}
            petName={selectedPet?.name || 'Pet'} 
            onBack={handleBackToList}
            petEvents={petEvents}
            setPetEvents={setPetEvents}
          />
        );
      case 'notes':
        return (
          <NotesScreen 
            pet={selectedPetForNote}
            onSave={handleSaveNote}
            onBack={handleBackFromNotes}
          />
        );
      case 'inicial':
      default:
        return <InitialScreen onNavigate={setCurrentScreen} userName={userName} profilePhoto={profilePhoto} petEvents={petEvents} setPetEvents={setPetEvents} onOpenNotes={handleOpenNotes} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <StatusBar style="dark" backgroundColor="#E1D8CF" />
    </>
  );
}
