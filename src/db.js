
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'you_time',
  password: '123456',
  port: 5432,
});


function query(text, params) {
  return pool.query(text, params)
}

module.exports = {
  query
}
  ;
