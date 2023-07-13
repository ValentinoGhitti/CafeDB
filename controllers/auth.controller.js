const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { JTWgenerate } = require("../helpers/JWTgenerate");
const { googleVerify } = require("../helpers/googleVerify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { mail, name, img } = await googleVerify(id_token);
    console.log('EL MAIL ES', mail)
    let user = await User.findOne({mail});
    
    if ( !user ) {
      const data = {
        name,
        mail,
        password: 'quierounaBudwaiseRr',
        img,
        role: 'USER_ROLE',
        google: true      
      }

      user = new User(data);
      await user.save();
    }

    if ( !user.state ) {
      return res.status(401).json({
        msg: 'Hable con el admin, usuario bloqueado'
      });
    }

    const token = await JTWgenerate(user.id);
    
    res.json({
      user,
      token
    });

  } catch (error) {
    res.status(400).json({
      msg: 'El token no se pudo verificar',
      error
    });
  }
}

module.exports = {
  login,
  googleSignIn
}