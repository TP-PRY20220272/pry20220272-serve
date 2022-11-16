const express = require('express')
const routes = express.Router()

const tableName = "project"

routes.get('/', (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`SELECT * FROM ${tableName}`, (error, rows)=>{
      if(error) return res.send(error)
      res.json(rows)
    })
  })
})

routes.post('/', (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`INSERT INTO ${tableName} set ?`, [req.body], (error, rows)=>{
      if(error) return res.send(error)
      res.json(rows)
    })
  })
})

routes.delete('/:id', (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
    connection.query(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id], (error, rows)=>{
      if(error) return res.send(error)
      res.status(200).json({
        message: "Project deleted"
      })
    })
  })
})

routes.put('/:id', (req, res)=>{
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
})

module.exports = routes