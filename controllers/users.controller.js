const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = (req, res = response) => {
  const {
    q,
    nombre = 'no name',
    apikey,
    page = 1,
    limit
  } = req.query;

  res.json({
    msg: 'GET API - controller',
    q,
    nombre,
    apikey,
    page,
    limit
  });
}

const usersPost = async (req, res = response) => {

  const {
    name,
    mail,
    password,
    role
  } = req.body;
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

const usersPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'PUT API - controller',
    id
  });
}

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'PATCH API - controller'
  });
}

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'DELETE API - controller'
  });
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}