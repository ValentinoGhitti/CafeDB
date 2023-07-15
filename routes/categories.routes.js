const { check } = require('express-validator');
const { Router } = require('express');
const {fieldValidate} = require('../middlewares/validate-field')

const router = Router();

// obtener todas las categorías - public
router.get('/', (req, res) => {
  res.json('todo ok wacho');
});

// obtener una categoría por id - public
router.get('/:id', (req, res) => {
  res.json('todo ok wacho');
});

// obtener una categoría - public
router.get('/', (req, res) => {
  res.json('todo ok wacho');
});

// crear categoría - private 
router.post('/', (req, res) => {
  res.json('todo post wacho');
});

// actualizar una categoría - private 
router.put('/:id', (req, res) => {
  res.json('todo put wacho');
});

// borrar una categoría - private 
router.delete('/:id', (req, res) => {
  res.json('todo delete wacho');
});


module.exports = router;