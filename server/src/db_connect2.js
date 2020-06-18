const mysql= require('mysql2');

const pool = mysql.createPool({
    host:'192.168.21.123',
    user:'test',
    password:'test',
    database:'database',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});
module.exports=pool.promise();