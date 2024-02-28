import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'grocery_db',
  port: 3306

});

export default pool;
