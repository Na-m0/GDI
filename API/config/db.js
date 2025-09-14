const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projet',
  password: '2812',
  port: 5432,
});

module.exports = pool;
