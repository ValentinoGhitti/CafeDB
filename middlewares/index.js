const validateFields = require('../middlewares/validate-field');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
}