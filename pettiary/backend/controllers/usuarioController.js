const User = require('../models/Usuario');


exports.getProfile = (req, res) => {
  try {
    const userId = req.params.id || 1; 
    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = (req, res) => {
  try {
    const userId = req.params.id || 1;
    const { name, email } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const updatedUser = User.updateProfile(userId, { name, email });
    const { password, ...userWithoutPassword } = updatedUser;

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Alterar senha
exports.changePassword = (req, res) => {
  try {
    const userId = req.params.id || 1;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
    }

    const result = User.updatePassword(userId, currentPassword, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
