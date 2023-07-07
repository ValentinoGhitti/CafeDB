const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { JTWgenerate } = require("../helpers/JWTgenerate");

const login = async (req, res = response) => {

  const { mail, password } = req.body;

  try {

    //verificar si el mail existe
    const user = await User.findOne({mail})
    if ( !user ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - MAIL'
      });
    }
    //si el user está activo
    if ( !user.state ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - state'
      });
    }
    //verificar la password
    const validPass = bcryptjs.compareSync( password, user.password);

    if (!validPass) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }
    //generar el JWT
    const token = await JTWgenerate(user.id)

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Habla con el admin'
    });
  }
}

module.exports = {
  login
}