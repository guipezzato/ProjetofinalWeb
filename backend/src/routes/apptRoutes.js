const express = require('express');
const router = express.Router();
const ApptController = require('../controllers/apptController');

// Mapeamento das rotas ligadas às funções do Controller
router.get('/', ApptController.getAll);
router.post('/', ApptController.create);
router.put('/:id', ApptController.update);
router.delete('/:id', ApptController.delete);

// Força a exportação do roteador do Express (Isso evita o objeto vazio)
module.exports = router;