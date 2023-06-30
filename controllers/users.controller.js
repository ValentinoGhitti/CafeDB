const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req, res = response) => {
  const {limit = 5, from = 0} = req.query;
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({
    total,
    users
  });
}

const usersPost = async (req, res = response) => {
  const {name,mail,password,role} = req.body;
  const user = new User({name, mail, password, role});

  //encriptar la pass
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  //guardar en DB 
  await user.save();

  res.json({
    user
  });
}

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const {_id, password ,google, mail, ...rest} = req.body;

  //TODO validar contra DB
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    user
  });
}

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'PATCH API - controller'
  });
}

const usersDelete = async (req, res = response) => {
  const {id} = req.params;
  //const user = await User.findByIdAndDelete(id);

  //cambiar el estado
  const user = await User.findByIdAndUpdate(id, {state: false});
  res.json(user);
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}