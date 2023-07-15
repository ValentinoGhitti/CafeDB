const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      users: '/api/users'
    }

    //Conectar a base de datos
    this.conectarDB();
    //Middlewares
    this.middlewaress();

    //rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewaress() {
    //CORS
    this.app.use(cors());
    //parseo y lectura del body
    this.app.use(express.json());
    //directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto:', this.port);
    });
  }
}

module.exports = Server;