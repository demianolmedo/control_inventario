const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'HOST', 
     user:'USER', 
     password: 'PASS',
     charset: 'utf8mb4',
     database: 'bd_NOMBRE',
     operatorsAliases: 0     
     //connectionLimit: 15
});

module.exports = pool;



