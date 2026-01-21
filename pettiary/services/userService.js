import api from './api';

export const userService = {
  getProfile: async (userId = 1) => {
    try {
      const response = await api.get(`/users/profile/${userId}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  updateProfile: async (userId = 1, data) => {
    try {
      const response = await api.put(`/users/profile/${userId}`, data);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  changePassword: async (userId = 1, currentPassword, newPassword) => {
    try {
      const response = await api.put(`/users/password/${userId}`, {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw error;
    }
  },
};
