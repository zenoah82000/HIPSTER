const mysql= require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'hipster',
    password:'hipster',
    database:'database_1',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});
module.exports=pool.promise();