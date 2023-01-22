const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const portProc = process.env.PORT || 8080;
const corsOpts = {
  origin: '*',

  methods: ['GET', 'POST', 'PUT', 'DELETE','PUTCH'],

  allowedHeaders: ['Content-Type'],
};
class Server {
  constructor() {
    this.app = express();
    this.port = portProc;

    this.clientPath = '/api';

    //Middlewares
    this.middleeares();

    //Rutas de la aplicación
    this.routes();
  }

  middleeares() {
    //CORS
    this.app.use(cors(corsOpts));

    //Lectura y perseo del body
    this.app.use(express.json());

    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.clientPath, require('../routes/client'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('El servidor está corriendo ', this.port);
    });
  }
}

module.exports = Server;
