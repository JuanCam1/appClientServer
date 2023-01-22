require('dotenv').config();
const { createPool } = require('mysql2/promise');

// const pool = new createPool({
//   host: "localhost",
//   user: "root",
//   password: "juan1216",
//   port: "3306",
//   database: "appclientes",
// });

const pool = new createPool({
  host: 'us-east.connect.psdb.cloud',
  user: 'wdxa38rod1axxng7m6c9',
  password: 'pscale_pw_Die1G1QKBKRW4DvrT4GXa2D2HHBkA9gG9Os7LNmrluL',
  port: '3306',
  database: 'db_clients',
  ssl: {
      rejectUnauthorized: false
  },
});

module.exports = pool;
