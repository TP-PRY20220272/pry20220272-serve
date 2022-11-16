const controller = {};
const tableName = "project"

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

controller.create = (req, res)=>{
  req.getConnection((error, connection) => {
    if(error) return res.send(error)
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