const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = (req, res, next) => {
  try{
    const token = req.headers.token
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decode
    next()
  }catch(err){
    res.send(err)
  }
}