const Storage = require('../models/storage');

const AuthController = {
  register(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Todos os campos são obrigatórios.' });
      }

      const users = Storage.getUsers();
      
      // Verifica se o e-mail já está cadastrado
      const userExists = users.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ msg: 'Este e-mail já está cadastrado.' });
      }

      // Cria o novo usuário
      const newUser = { id: Date.now().toString(), name, email, password };
      users.push(newUser);
      Storage.saveUsers(users);

      return res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro interno no servidor.' });
    }
  },

  login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: 'E-mail e senha são obrigatórios.' });
      }

      const users = Storage.getUsers();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return res.status(401).json({ msg: 'E-mail ou senha incorretos.' });
      }

      // Retorna os dados do usuário para o Front-end salvar a sessão
      return res.status(200).json({
        msg: 'Login realizado com sucesso!',
        session: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro interno no servidor.' });
    }
  }
};

module.exports = AuthController;