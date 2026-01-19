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
  const [pets, setPets] = useState([
    {
      id: '1',
      name: 'Lua',
      type: 'cat',
      gender: 'Fêmea',
      age: '6 meses',
      image: null,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Max',
      type: 'dog',
      gender: 'Macho',
      age: '2 anos',
      image: null,
      isFavorite: true,
    },
  ]);

  return (
    <PetsContext.Provider value={{ pets }}>
      {children}
    </PetsContext.Provider>
  );
};
