require('dotenv').config();
require('./model/user');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth')
const  connection  = require('./config/database').connection;
const app = express();

app.use(express.json())

app.post('/register', (req,res) => {
    const { Firstname, Lastname, Email, Password } = req.body;
    
       if(req.body != undefined && Firstname && Lastname && Email && Password){  
           
           const SQL = `SELECT Email FROM users WHERE Email = '${Email}'`;
           connection.query(SQL, async (err,result) => {
            try{
               if(err) throw err;
               else if (result.length != 0){
                    (res.status(409).send('User already exist.Please login again')) 
                 }  
                else{
                    let encryptpwd = await bcrypt.hash(Password,10);
                    const token = jwt.sign({userID: Email}, process.env.TOKENKEY,{expiresIn: '2h'})
                    console.log(token);
                    const SQL1 = `INSERT INTO users (id, Firstname, Lastname, Email, Password, Token) VALUES('${Firstname}','${Lastname}','${Email}','${encryptpwd}','${token}')`;
                    connection.query(SQL1, (err, result) => {
                         if(err) throw err;
                          res.status(200).json(result)
                      });
                      return;
                 }
            }
           catch(err){
              throw err;
            }
        })
    }
    else{
         res.status(400).send("All input are required");
    } 
})     

app.post('/login', (req, res) => {
    const {Email, Password} = req.body;

    if(req.body != undefined && Email && Password) {

          const sql = `SELECT * FROM users WHERE Email = "${Email}"`;
          connection.query(sql, async (err, result) => {
            try{
                if(err) throw err;

               else if(result.length == 0 ){
                res.send("User doesn't exist, Please register")
              }
                else{

                 if(await bcrypt.compare(Password,result[0].Password)){
                    const token = jwt.sign({userID: Email}, process.env.TOKENKEY,{expiresIn: '2h'});
                    result[0].Token = token;
                    res.status(200).json(result[0]);
                 }

                }
            }
            catch(err){
                 throw err;
              }
              
        })

    }
    else{
          (res.status(401).send("All inputs required"));
    }

})

app.post('/welcome', verifyToken , (req,res) => {
    res.status(200).send("Welcome")
})


module.exports = app;