const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio']
  },
  mail: {
    type: String,
    required: [true, 'El mail es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model('user', UsuarioSchema);