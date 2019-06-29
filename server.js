const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const index = require('./routes/index')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index)

app.get('/s', (req, res) => {
  res.send('OK')
})

app.use(function (err, req, res, next) {
  if (err) {
    return res.send({
      status: err.status,
      message: err.message
    });
  }
});

const port = process.env.PORT || 3000

app.listen(port, console.log(`start at ${port}`))