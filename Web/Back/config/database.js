const { Pool, Client } = require('pg');

const DB_OPTIONS = {
  user: 'root',
  password: '1234',
  database: 'web',
};


module.exports = {
    client: new Client(DB_OPTIONS),
    pool: new Pool(DB_OPTIONS)
};
