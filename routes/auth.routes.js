const { check } = require('express-validator');
const {fieldValidate} = require('../middlewares/validate-field')
const { login } = require('../controllers/auth.controller');
const { Router } = require('express');

const router = Router();

router.post('/login',[
  check('mail', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  fieldValidate
],login);

module.exports = router;