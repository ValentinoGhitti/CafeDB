const jwt = require('jsonwebtoken');

const JTWgenerate = (uid = '') => {
  return new Promise( (resolve, reject) => {

    const payload = {uid};
    
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('no se pudo generar al token :(')
      } else {
        resolve(token);
      }
    });
  })
}

module.exports = {
  JTWgenerate
}