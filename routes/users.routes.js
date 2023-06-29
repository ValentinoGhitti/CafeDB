const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validate-field');
const { isRoleValid, emailExist } = require('../helpers/db-validators');
const { 
  usersGet, 
  usersPost, 
  usersPatch, 
  usersPut, 
  usersDelete 
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);
router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria y debe contener más de seis letras').isLength({min: 6}),
  check('mail', 'El correo no es valido').isEmail(),
  check('mail').custom(mail => emailExist(mail)),
  //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(role => isRoleValid(role)),
  validateField
], usersPost);
router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;