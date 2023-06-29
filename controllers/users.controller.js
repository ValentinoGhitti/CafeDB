const {response} = require('express');

const usersGet = (req, res = response) => {
  const {q = 'test'} = req.query;

  res.json({
    msg: 'GET API - controller',
    q
  });
}

const usersPost = (req, res = response) => {
  const {nombre, edad} = req.body;
  res.json({
    msg: 'POST API - controller',
    nombre,
    edad
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