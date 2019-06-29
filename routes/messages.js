const routes = require('express').Router()
const message = require('../controllers/messageController')
const auth = require('../middleware/auth')


routes.post('/',auth.auth, message.createMsg)
routes.get('/',auth.auth, message.showMsg)
routes.patch('/',auth.auth, message.updateMsg)
routes.delete('/:id',auth.auth, message.deleteMsg)
// routes.post('/a', message.test)

module.exports = routes