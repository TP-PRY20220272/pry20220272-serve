const express = require('express')
const jwt = require('jsonwebtoken')
const routes = express.Router()

const controller = require('../controllers/user-controller')

routes.post('/register', controller.create)
routes.post('/auth', controller.authenticate)

routes.get('/', controller.listAll)
routes.get('/:id', controller.getById)
//routes.get('/filter/:username', controller.getByUsername)

routes.delete('/:id', controller.delete)

routes.put('/:id', controller.update)

module.exports = routes