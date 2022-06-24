const connection = require('../config/database').connection;

const SQL1 = 'CREATE TABLE users(id int, FirstName VARCHAR(20), LastName Varchar(20), Email Varchar(255), Password varchar(255), Token TEXT)';
const SQL = 'SHOW TABLES from jwt'
connection.query(SQL, (err,result) => {
     if(err) throw err; 
     if((result[0].Tables_in_jwt.indexOf('users')) == -1) {
          connection.query(SQL1,(err, result) => {
               if(err) throw err; 
               console.log("Table created");
          });
     } 
})
