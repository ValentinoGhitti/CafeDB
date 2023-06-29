const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({role});
  if (!existRole) {
    throw new Error(`El rol '${role}' no está registrado en la DB`);
  }
}

const emailExist = async (mail = '') => {
  const existEmail = await User.findOne({mail});
  if (existEmail) {
    throw new Error(`El email '${mail}' ya está en uso`)
  }
}

module.exports = {
  isRoleValid,
  emailExist
}