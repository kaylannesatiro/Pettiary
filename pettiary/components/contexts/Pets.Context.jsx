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

  return (
    <PetsContext.Provider value={{ pets }}>
      {children}
    </PetsContext.Provider>
  );
};
