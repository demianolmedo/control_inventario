const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '89.117.59.147', 
     user:'datacombo', 
     password: 'D4t4comiano$2023!',
     charset: 'utf8mb4',
     database: 'bd_SGM',
     operatorsAliases: 0     
     //connectionLimit: 15
});

module.exports = pool;



