const { response } = require("express");

const isAdminRole = ( req, res = response, next) => {
  
  if (!req.user) {
    return res.status(500).json({
      msg: 'se quiere verificar el role sin validar el token primero'
    });
  }

  const {role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} no es administrador`
    });
  }

  next();
}

const haveRole = ( ...roles ) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'se quiere verificar el role sin validar el token primero'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `el servicio requiere uno de estos roles ${roles}`
      });
    }

    next();
  }
}


module.exports = {
  isAdminRole,
  haveRole
}