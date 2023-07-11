const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWTvalidate = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición brodi'
    });
  }
  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // leer el user que corresponda al uid
    const user = await User.findById(uid);
    if ( !user ) {
      return res.status(401).json({
        msg: 'Token no válido - usuario inexistente'
      })
    }
    // Verificar si el uid tiene state en true
    if ( !user.state ) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado en false'
      })
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'token invalido'
    });
  }

}

module.exports = {
  JWTvalidate
}