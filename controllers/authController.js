const connection = require('../models/dbconnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


exports.test = (req, res) => {
  res.send(req.body.email)
}

exports.signUp = (req, res) => {
  const username = req.body.username
  const password = bcrypt.hashSync(req.body.password, 10)
  const email = req.body.email
  connection.query(`INSERT INTO users VALUES (null, '${username}', '${password}', '${email}')`, (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      res.send("Sign in berhasil")
    }
  })
}

exports.signIn = (req, res) => {
  const password = req.body.password
  const email = req.body.email
  connection.query(`SELECT*FROM users WHERE email = '${email}' `, (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      if(rows.length == 0){
        res.send(rows)
      }else{
        if( bcrypt.compareSync(password, rows[0].password)){
          const token = jwt.sign({id: rows[0].id, email: rows[0].email, username: rows[0].username}, process.env.SECRET_KEY)
          if(token){
            res.send({token: token})
          }
        }else{
          res.send({status:false, msg:'Password salah'})   
        }
      }
    }
  })
}