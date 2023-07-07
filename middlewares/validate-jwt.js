const jwt = require('jsonwebtoken');

const JWTvalidate = (req = req, res = response, next) => {
  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición brodi'
    });
  }
  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;

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