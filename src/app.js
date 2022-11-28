const express = require('express')
const mysql = require('mysql2')
const myconnection = require('express-myconnection')
const morgan = require('morgan')

const routesProject = require('./routes/project-routes.js')
const routesUser = require('./routes/user-routes.js')
const credentials = require('../middlewares/credentials')
const cors = require('cors');
const corsOptions = require('../config/corsOptions')

const app = express()
app.set('port', process.env.PORT || 9000)

const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'pry'
}

//Middelwares
app.use(credentials)
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(myconnection(mysql, dbOptions, 'single'))
app.use(express.json())


//ROUTES -----------
app.get('/', (req, res)=>{
  res.send("Welcome to my backend in Node Js")
})
app.use('/projects', routesProject)
app.use('/users', routesUser)


// STATIC FILES


// STARTING SERVER
app.listen(app.get('port'), ()=>{
  console.log("Server running on port:", app.get('port'))
})