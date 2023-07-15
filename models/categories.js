const {Schema, model} = require('mongoose');

const CategorieSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El rol es obligatorio']
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = model('Categorie', CategorieSchema);