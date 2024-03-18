const express = require('express')
const cors = require('cors')
const usersBLL = require('./BLL/usersBLL')

const port = 8000
const app = express() 

app.use(express.json())
app.use(cors())

// connect db
require('./config/database')

// Routers
const usersRouter = require('./Routers/usersRouter')
const shiftsRouter = require('./Routers/shiftsRouter')
const employeesRouter = require('./Routers/employeesRouter')
const departmentsRouter = require('./Routers/departmentsRouter')
const actionsRouter = require('./Routers/actionsRouter')

app.use('/users', usersRouter)
app.use('/shifts', shiftsRouter)
app.use('/employees', employeesRouter)
app.use('/departments', departmentsRouter)
app.use('/actions', actionsRouter)


app.listen(port, () => {
    console.log(`server is listening port ${port}`);
    usersBLL.loadData()
})

