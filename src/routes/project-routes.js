const express = require('express')
const routes = express.Router()

const controller = require('../controllers/project-controllers')

const tableName = "project"

routes.get('/', controller.listAll)
routes.get('/:id', controller.getById)

routes.post('/', controller.create)

routes.delete('/:id', controller.delete)

routes.put('/:id', controller.update)

module.exports = routes