import React, { createContext, useState, useContext } from 'react';

const PetsContext = createContext();

export const usePets = () => {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de um PetsProvider');
  }
  return context;
};

export const PetsProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  const toggleFavorite = (petId) => {
    setPets(prevPets =>
      prevPets.map(pet =>
        pet.id === petId ? { ...pet, isFavorite: !pet.isFavorite } : pet
      )
    );
  };

  const addPet = (newPet) => {
    const pet = {
      ...newPet,
      id: Date.now().toString(),
      isFavorite: false,
      diary: []
    };
    setPets(prevPets => [...prevPets, pet]);
  };

  const removePet = (petId) => {
    setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
  };

  const updatePet = (petId, updatedData) => {
    setPets(prevPets =>
      prevPets.map(pet =>
        pet.id === petId ? { ...pet, ...updatedData } : pet
      )
    );
  };

  const addDiaryEntry = (petId, entry) => {
    setPets(prevPets =>
      prevPets.map(pet =>
        pet.id === petId
          ? { ...pet, diary: [...pet.diary, { ...entry, id: Date.now().toString() }] }
          : pet
      )
    );
  };

  const getPetById = (petId) => {
    return pets.find(pet => pet.id === petId);
  };

  const getPetsByType = (type) => {
    return pets.filter(pet => pet.type === type);
  };

  const getFavoritePets = () => {
    return pets.filter(pet => pet.isFavorite);
  };

  const searchPets = (query) => {
    if (!query) return pets;
    return pets.filter(pet =>
      pet.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <PetsContext.Provider
      value={{
        pets,
        toggleFavorite,
        addPet,
        removePet,
        updatePet,
        addDiaryEntry,
        getPetById,
        getFavoritePets,
        getPetsByType,
        searchPets
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};
