const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken')

const controller = require('../controllers/project-controller')

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
    if(error) return res.sendStatus(403)
    req.user = user
    next()
  })
}

routes.get('/', authenticateToken, controller.listAll)
routes.get('/:id', controller.getById)

routes.post('/', controller.create)

routes.delete('/:id', controller.delete)

routes.put('/:id', controller.update)

module.exports = routes