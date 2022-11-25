require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {};
const tableName = "user"

controller.authenticate = (req, res)=>{
  req.getConnection(async (error, connection) => {
    if(error) return res.send(error)
    
    connection.query(
      `SELECT * FROM ${tableName} WHERE username = ?`, 
      [req.body.username], 
      async (error, rows)=>{

        if(error) return res.send(error)

        const user = rows[0]

        if(await bcrypt.compare(req.body.password, user.password)){
          user.accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          res.json(user)
        } else { 
          res.status(401).send("NOT ALLOWED!")
        }
      }
    )
  })
}

controller.listAll = (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`SELECT * FROM ${tableName}`, (error, rows)=>{
      if(error) return res.send(error)
      res.json(rows)
    })
  })
}

controller.getById = (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id], (error, rows)=>{
      if(error) return res.send(error)
      res.json(rows)
    })
  })
}

controller.getByUsername = (req, res)=>{
  req.getConnection(async (error, connection) => {
    if(error) return res.send(error)
    
  })
}

controller.create = (req, res)=>{
  req.getConnection( async (error, connection) => {
    if(error) return res.send(error)

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword

    connection.query(`INSERT INTO ${tableName} set ?`, [req.body], (error, rows)=>{
      if(error) return res.send(error)
      res.json(rows)
    })
  })
}
controller.delete = (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id], (error, rows)=>{
      if(error) return res.send(error)
      res.status(200).json({
        message: "Project deleted"
      })
    })
  })
}
controller.update = (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(
      `UPDATE ${tableName} set ? WHERE id = ?`, 
      [req.body, req.params.id], 
      (error, rows)=>{
        if(error) return res.send(error)
        res.status(200).json(rows)
      }
    )
  })
}

module.exports = controller;