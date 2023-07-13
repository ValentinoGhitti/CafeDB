const { check } = require('express-validator');
const {fieldValidate} = require('../middlewares/validate-field')
const { login, googleSignIn } = require('../controllers/auth.controller');
const { Router } = require('express');

const router = Router();

router.post('/login',[
  check('mail', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  fieldValidate
],login);

router.post('/google',[
  check('id_token', 'id_token de google obligatorio').not().isEmpty(),
  fieldValidate
],googleSignIn);

module.exports = router;