import api from './api';

export const petService = {
  getAllPets: async () => {
    try {
      const response = await api.get('/pets');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPetById: async (id) => {
    try {
      const response = await api.get(`/pets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPet: async (petData) => {
    try {
      const response = await api.post('/pets', petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePet: async (id, petData) => {
    try {
      const response = await api.put(`/pets/${id}`, petData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

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
  getAllActivities: async (petId = null) => {
    try {
      const url = petId ? `/activities?petId=${petId}` : '/activities';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getActivityById: async (id) => {
    try {
      const response = await api.get(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createActivity: async (activityData) => {
    try {
      const response = await api.post('/activities', activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  toggleActivityComplete: async (id) => {
    try {
      const response = await api.patch(`/activities/${id}/toggle`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateActivity: async (id, activityData) => {
    try {
      const response = await api.put(`/activities/${id}`, activityData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteActivity: async (id) => {
    try {
      const response = await api.delete(`/activities/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
