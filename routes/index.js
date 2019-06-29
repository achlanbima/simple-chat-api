const routes = require('express').Router()
const message = require('./messages')
const auth = require('../controllers/authController')


routes.post('/signUp', auth.signUp)
// routes.get('/a', auth.test)
routes.post('/signIn', auth.signIn)
routes.use('/messages', message)

module.exports = routes