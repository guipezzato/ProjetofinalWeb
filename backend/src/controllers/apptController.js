const Storage = require('../models/storage');

async register(req, res) {
  getAll(req, res) {
    try {
      const userId = req.headers['user-id']; // 
      if (!userId) return res.status(401).json({ msg: 'Não autorizado.' });

      const allAppts = Storage.getAppts();
      
      const userAppts = allAppts.filter(a => a.userId === userId);

      return res.status(200).json(userAppts);
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao buscar agendamentos.' });
    }
  },

  create(req, res) {
    try {
      const userId = req.headers['user-id'];
      if (!userId) return res.status(401).json({ msg: 'Não autorizado.' });

      const { date, time, name, phone, vehicle, service, obs } = req.body;

      const newAppt = {
        id: Date.now().toString(),
        userId, 
        date, time, name, phone, vehicle, service, obs
      };

      const appts = Storage.getAppts();
      appts.push(newAppt);
      Storage.saveAppts(appts);

      return res.status(201).json({ msg: 'Agendamento criado com sucesso!', appt: newAppt });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao criar agendamento.' });
    }
  },

  update(req, res) {
    try {
      const userId = req.headers['user-id'];
      const { id } = req.params;
      const { date, time, name, phone, vehicle, service, obs } = req.body;

      const appts = Storage.getAppts();
      const index = appts.findIndex(a => a.id === id && a.userId === userId);

      if (index === -1) return res.status(404).json({ msg: 'Agendamento não encontrado.' });

      appts[index] = { ...appts[index], date, time, name, phone, vehicle, service, obs };
      Storage.saveAppts(appts);

      return res.status(200).json({ msg: 'Agendamento atualizado!', appt: appts[index] });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao atualizar agendamento.' });
    }
  },

  delete(req, res) {
    try {
      const userId = req.headers['user-id'];
      const { id } = req.params;

      const appts = Storage.getAppts();
      const filtered = appts.filter(a => !(a.id === id && a.userId === userId));

      if (appts.length === filtered.length) {
        return res.status(404).json({ msg: 'Agendamento não encontrado.' });
      }

      Storage.saveAppts(filtered);
      return res.status(200).json({ msg: 'Agendamento excluído com sucesso!' });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao excluir agendamento.' });
    }
  }
};

module.exports = ApptController;