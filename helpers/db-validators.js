const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const existRole = await Role.findOne({role});
  if (!existRole) {
    throw new Error(`El rol '${role}' no está registrado en la DB`);
  }
}

const existEmail = async (mail = '') => {
  const existEmail = await User.findOne({mail});
  if (existEmail) {
    throw new Error(`El email '${mail}' ya está en uso`)
  }
}

const userExistById = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El ID '${id}' no existe`)
  }
}

module.exports = {
  isRoleValid,
  existEmail,
  userExistById
}