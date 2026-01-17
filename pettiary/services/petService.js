import api from './api';

export const petService = {
  // Buscar todos os pets
  getAllPets: async () => {
    try {
      const response = await api.get('/pets');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar pet por ID
  getPetById: async (id) => {
    try {
      const response = await api.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Criar novo pet
  createPet: async (petData) => {
    try {
      const response = await api.post('/pets', petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar pet
  updatePet: async (id, petData) => {
    try {
      const response = await api.put(`/pets/${id}`, petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Deletar pet
  deletePet: async (id) => {
    try {
      const response = await api.delete(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const activityService = {
  // Buscar todas as atividades
  getAllActivities: async (petId = null) => {
    try {
      const url = petId ? `/activities?petId=${petId}` : '/activities';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Buscar atividade por ID
  getActivityById: async (id) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Criar nova atividade
  createActivity: async (activityData) => {
    try {
      const response = await api.post('/activities', activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Alternar status de conclusão
  toggleActivityComplete: async (id) => {
    try {
      const response = await api.patch(`/activities/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar atividade
  updateActivity: async (id, activityData) => {
    try {
      const response = await api.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Deletar atividade
  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
