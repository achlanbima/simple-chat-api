const connection = require('../models/dbconnection')

exports.test = (req, res) => {
  res.send(req.body)
}

exports.showMsg = (req, res) => {
  connection.query('SELECT*FROM v_post ', (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      res.send({data: rows, users: req.user})
    }
  })
}

exports.createMsg = (req, res) => {
  const userId = req.user.id
  const message = req.body.message

  connection.query(`INSERT INTO message VALUES (null, '${userId}', '${message}', null) `, (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      res.send("Messages created")
    }
  })
}

exports.deleteMsg = (req, res) => {
  const id = req.params.id

  connection.query(`DELETE FROM message WHERE id=${id} `, (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      res.send("Messages deleted")
    }
  })
}

exports.updateMsg = (req, res) => {
  const id = req.body.id
  const message = req.body.message

  connection.query(`UPDATE message SET message='${message}' WHERE id=${id} `, (err, rows, fields) => {
    if(err){
      res.send(err)
    }else{
      res.send(rows)
    }
  })
}