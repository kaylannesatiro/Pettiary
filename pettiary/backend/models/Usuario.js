
let users = [
  {
    id: 1,
    name: 'Carla-Kaylanne',
    password: '123456',
  }
];

const User = {
  findById: (id) => {
    return users.find(user => user.id === id);
  },

  updateProfile: (id, data) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('Usuário não encontrado');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...data,
    };

    return users[userIndex];
  },

  updatePassword: (id, currentPassword, newPassword) => {
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.password !== currentPassword) {
      throw new Error('Senha atual incorreta');
    }

    const userIndex = users.findIndex(user => user.id === id);
    users[userIndex].password = newPassword;

    return { success: true, message: 'Senha alterada com sucesso' };
  },

  getAll: () => {
    return users;
  }
};

module.exports = User;
