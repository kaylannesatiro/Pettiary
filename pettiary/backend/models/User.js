// Modelo de usuário (simulado)
// Em produção, você usaria um banco de dados real

let users = [
  {
    id: 1,
    name: 'CK',
    email: 'ck@pettiary.com',
    password: '123456', // Em produção, use hash de senha
  }
];

const User = {
  findById: (id) => {
    return users.find(user => user.id === id);
  },

  findByEmail: (email) => {
    return users.find(user => user.email === email);
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
